# 제품별 공개 문서

제품별 개인정보처리방침, 이용약관, 고객지원, 오픈소스 고지를 다음 경로에 배포합니다.

```text
products/<product-slug>/
```

제품 디렉터리는 각 제품 저장소의 검증된 정책 빌드에서 생성합니다. 직접 수정한 초안이나
`publish-manifest.json`이 없는 디렉터리는 GitHub Pages 배포 대상에 포함하지 않습니다.

공개 저장소에는 정책 문서에 실제로 표시할 회사 정보와 공개 자산만 넣습니다. `.env`, API
토큰, 광고 그룹 ID, 인증서, 서명키, 통장 사본, 사업자등록증 원본은 커밋하지 않습니다.

## 무한공전

- 제품 경로: `products/muhan-gongjeon/`
- 공개 기본 주소: `https://akoracorp.com/products/muhan-gongjeon/`
- 생성 원본: `/Users/ahn/Workspace/html5-game/legal-site/`
- 생성 명령: `/Users/ahn/Workspace/html5-game`에서 `npm run export:legal:company`
