## **고양이 사진첩 애플리케이션**

![Untitled](https://grepp-programmers.s3.amazonaws.com/image/origin/production/skill_check_assignment/119211/ae62b4c1-2fff-465a-81c7-1c4ba4a5288c.png)

> 프로그래머스 2021 Dev-Matching: 웹 프론트엔드 개발자(상반기) - 고양이 사진첩

### 문제링크

[https://programmers.co.kr/skill_check_assignments/100](https://programmers.co.kr/skill_check_assignments/100)

### 개요
당신은 고양이들의 사진을 관리해달라는 의뢰를 받았습니다. 이를 위해 주어진 API를 이용하여 웹 애플리케이션을 만들어야 합니다. 애플리케이션은 다음과 같은 기능을 포함해야 합니다:


- 1. 디렉토리 탐색
- 2. 이미지 뷰어
- 3. Breadcrumb를 통한 경로 탐색


### 구현 사항
1. Breadcrumb
   현재 탐색 중인 경로를 나타냅니다. root부터 시작하여 클릭한 디렉토리를 순서대로 나열합니다.
```html
<nav class="Breadcrumb">
  <div>root</div>
  <div>노란고양이</div>
</nav>
```


2. Nodes
   현재 경로에 속한 파일 및 디렉토리를 렌더링합니다.

디렉토리를 클릭하면 해당 디렉토리의 파일 및 하위 디렉토리를 불러옵니다.
파일을 클릭하면 이미지를 불러와 화면에 표시합니다.
```html
<!-- 디렉토리 마크업 -->
<div class="Node">
  <img src="./assets/directory.png">
  <div>2021/04</div>
</div>

<!-- 파일 마크업 -->
<div class="Node">
  <img src="./assets/file.png">
  <div>하품하는 사진</div>
</div>

<!-- 이전 디렉토리로 이동 -->
<div class="Node">
  <img src="./assets/prev.png">
</div>
```

3. ImageView
   파일을 클릭하면 모달을 띄워 이미지를 표시합니다.
```html
<div class="ImageViewer">
  <div class="content">
    <img src="이미지 경로">
  </div>
</div>

```

### API 개요
Root 내용 가져오기
GET 요청을 통해 root 경로에 있는 파일 및 디렉토리를 불러옵니다.

URL: https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/

응답 예시:

```json
[
  {
    "id": "1",
    "name": "노란고양이",
    "type": "DIRECTORY",
    "filePath": null,
    "parent": null
  },
  {
    "id": "3",
    "name": "까만고양이",
    "type": "DIRECTORY",
    "filePath": null,
    "parent": null
  }
]
```
특정 디렉토리 내용 가져오기

GET 요청을 통해 특정 디렉토리 하위의 파일 및 디렉토리를 불러옵니다.

URL: https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev/:nodeId

응답 예시:
```json
[
  {
    "id": "5",
    "name": "2021/04",
    "type": "DIRECTORY",
    "filePath": null,
    "parent": {
      "id": "1"
    }
  },
  {
    "id": "19",
    "name": "물 마시는 사진",
    "type": "FILE",
    "filePath": "/images/a2i.jpg",
    "parent": {
      "id": "1"
    }
  }
]
```

### 데이터 형식
두 API에서 사용하는 데이터 형식은 다음과 같습니다:
```json
{
  "id":       "string",
  "name":     "string",
  "type":     "string",
  "filePath": "string",
  "parent":   {
    "id": "string"
  }
}

```

### 이미지 불러오기
이미지 경로를 다음과 같이 조합하여 이미지를 불러올 수 있습니다:

```url
https://fe-dev-matching-2021-03-serverlessdeploymentbuck-1ooef0cg8h3vq.s3.ap-northeast-2.amazonaws.com/public/${node.filePath}

```

### 유의사항
- 1. 컴포넌트 형태로 UI 요소를 추상화합니다.
- 2. 의존성이 느슨한 구조를 지향합니다.
- 3. API 호출 중 에러 처리를 구현합니다.
- 4. ES6 모듈 형태로 작성합니다.
- 5. async/await 문을 사용합니다.
- 6. 전역 오염을 최소화합니다.
- 7. 이벤트 바인딩 최적화를 합니다.
- 8. 로딩 중임을 알리는 UI 처리를 합니다.
- 9. 데이터 캐시를 구현합니다.


### 추가 구현 사항 (가산점)
- 1. Breadcrumb의 특정 아이템 클릭 시 해당 경로로 이동
- 2. 파일 클릭 시 이미지 닫기 처리 (ESC 키 또는 이미지 밖 클릭)
- 3. 로딩 중임을 알리는 UI 및 액션 차단
- 4. 데이터 캐시 및 재탐색 시 캐시된 데이터 활용


### 참고 사항
- API 호출 중 에러 처리를 구현하면 가산점이 있습니다.
- ES6 모듈 형태로 작성하면 가산점이 있습니다.
- async, await 문을 사용하면 가산점이 있습니다.
- 데이터 캐시 및 재탐색 시 캐시된 데이터를 활용하면 가산점이 있습니다.
