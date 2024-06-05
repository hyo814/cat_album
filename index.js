import { App } from "./src/App.js";

// window.onload 이벤트 핸들러
window.onload = () => {
    // App 인스턴스 생성
    const app = new App();
    // App 렌더링
    app.render();
}
