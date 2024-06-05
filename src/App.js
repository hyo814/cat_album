import { Breadcrumb, Nodes, ImageView } from "./components/uiComponents.js";
import { renderNodes } from "./dataHandler.js";

// App 컴포넌트 생성자 함수
export function App() {
    this.app = null;
    this.breadCrumb = null;
    this.modal = null;
    this.states = null;
    this.nodes = null;

    // App 렌더링 함수
    this.render = async () => {
        // '#App' 요소 선택
        this.app = document.querySelector('#App');
        // Breadcrumb 컴포넌트 초기화
        this.breadCrumb = new Breadcrumb(this.app, ['root']);
        // ImageView 컴포넌트 초기화
        this.modal = new ImageView();
        // 초기 상태 설정을 위한 데이터 로드
        this.states = await renderNodes(this.modal, this.breadCrumb, 'root');
        // Nodes 컴포넌트 초기화 및 상태 설정
        this.nodes = new Nodes(this.app, this.breadCrumb, this.modal, this.states);
    }
}
