import { IMAGE_BASE_URL, CURRENT_URL } from "../api.js";
import { addCache, checkCache, renderNodes } from "../dataHandler.js";

// 뒤로가기 위한 상태 스택
export const stack = [];

// Breadcrumb 컴포넌트 생성자 함수
export function Breadcrumb(app, initialState) {
    this.state = [...initialState];

    // nav 요소 생성 및 클래스명 추가
    this.target = document.createElement('nav');
    this.target.className = 'Breadcrumb';
    app.appendChild(this.target);

    // 상태 업데이트 및 렌더링 함수
    this.setState = (nextState) => {
        this.state = [...this.state, nextState];
        this.render();
    }

    // 이전 상태로 돌아가는 함수
    this.historyBack = (prevState) => {
        this.state = [...prevState];
        this.render();
    }

    // Breadcrumb 렌더링 함수
    this.render = () => {
        this.target.innerHTML = `${
            this.state.map((node, index) =>
                `<div class='nav-item' data-index=${index}>${index > 0 ? `<span> - <span>${node}` : node}</div>`).join('')
        }`
    }
    this.render();
}

// Nodes 컴포넌트 생성자 함수
export function Nodes(app, breadCrumb, modal, initialState) {
    this.state = { ...initialState };

    // div 요소 생성 및 클래스명 추가
    this.target = document.createElement('div');
    this.target.className = 'Nodes';
    app.appendChild(this.target);

    // 모달 객체
    this.modal = modal;

    // 상태 업데이트 및 렌더링 함수
    this.setState = (nextState) => {
        this.state = { ...nextState };
        this.render();
    }

    // 이전 버튼 요소 생성
    this.prevBtn = document.createElement('div');
    this.prevBtn.className = 'Node';

    // 이전 버튼 렌더링 함수
    this.renderPrevBtn = () => {
        this.target.innerHTML = ''; // 노드 초기화

        // 현재 디렉토리가 root가 아니면 이전 버튼 표시
        if (this.state.depth[this.state.depth.length - 1] !== 'root') {
            this.prevBtn.innerHTML = `<img class="back" src="./assets/prev.png"/>`;
            this.target.appendChild(this.prevBtn);
        }
    }

    // Nodes 렌더링 함수
    this.render = () => {
        this.renderPrevBtn();
        this.target.innerHTML += `${this.state.nodes.map((node, index) => {
            return `<div class="Node" data-path=${node.filePath ? node.filePath : '#'} data-id=${node.id}>
                    <img src=${node.type === 'DIRECTORY' ? `${CURRENT_URL}/assets/directory.png` : `${CURRENT_URL}/assets/file.png`}>
                <div>${node.name}</div></div>`;
        }).join('')
        }`
    }

    // 이전 상태로 돌아가는 함수
    this.historyBack = () => {
        const historyBack = stack.pop();
        this.setState({ ...historyBack });
        breadCrumb.historyBack([...historyBack.depth]);
    }

    this.render();

    // 클릭 이벤트 핸들러
    this.target.addEventListener('click', async (e) => {
        const filePath = e.target.parentNode.dataset.path;

        if (filePath === '#') { // 디렉토리 클릭 시
            stack.push({ ...this.state }); // 현재 상태를 스택에 푸시

            const id = e.target.parentNode.dataset.id;
            const directoryName = e.target.parentNode.lastChild.innerText;
            breadCrumb.setState(directoryName); // Breadcrumb 상태 업데이트

            this.target.innerHTML = ''; // 노드 초기화

            let states = null;
            const cache = checkCache(id);

            if (!cache) { // 캐시가 없으면
                states = await renderNodes(this.modal, breadCrumb, id);
                addCache(id, states);
                this.setState(states);
            } else {
                states = cache; // 캐시가 있으면 캐시에서 데이터 가져오기
                this.setState(states);
            }

        } else if (filePath) { // 파일 클릭 시 이미지 모달 표시
            const imageUrl = `${IMAGE_BASE_URL}${filePath}`;
            const modalClassName = 'Modal ImageViewer';
            this.modal.setModal(imageUrl, modalClassName);
        } else if (e.target.className === 'back') { // 이전 버튼 클릭 시
            this.historyBack();
        }
    });
}

// ImageView 컴포넌트 생성자 함수
export function ImageView(url = '') {
    this.url = url;
    this.target = document.createElement('div');
    this.target.className = 'hidden';
    document.body.appendChild(this.target);

    // 모달 설정 함수
    this.setModal = (url, className) => {
        this.url = url;
        this.className = className;
        this.render();
    }

    // 모달 닫기 이벤트 리스너 설정 함수
    this.setCloseEventListener = () => {
        document.addEventListener('click', e => {
            if (e.target.className === 'Modal ImageViewer') {
                this.setModal('', 'hidden');
            }
        });
    }

    // ImageView 렌더링 함수
    this.render = () => {
        this.target.className = this.className;
        this.target.innerHTML = `<div class="content"><img src=${this.url}></div>`;
        this.setCloseEventListener(); // 모달 렌더링 후 클릭 이벤트 등록
    }

    this.render();
}
