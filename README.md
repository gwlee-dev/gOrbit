# orbit_dashboard

    // gOrbit.listen({object}) => 함수 실행시마다 object의 내용을 데이터로 가져오고 업데이트 수행
    // gOrbit.update() => update_interval과 관계없이 즉시 업데이트 수행
    // gOrbit.dataList => 현재 갖고있는 데이터의 목록 array (fetch 결과가 저장됨, 내부에서 각 interval 마다 접근)
    // gOrbit.debug.start() => 로그 출력 시작 및 디버깅 패널 생성
    // gOrbit.debug.end() => 로그 출력 중단 및 디버깅 패널 제거

    // orbit 초기화 및 옵션 가져오기 (함수 실행 시점은 관계없음, 최초 1회 이후 재실행 금지)
    gOrbit.init({
    	// 디버그 모드로 실행 (boolean)
    	debug: true,

    	// 모든 객체의 클래스명 prefix 지정
    	base_class: "orbit",

    	// 첫번째 궤도의 반지름 지정 (rem, 이후 2배씩 증가)
    	base_radius: 7,

    	// 첫번째 궤도에서 표시할 아이템 수 지정 (정수, 이후 2배씩 증가)
    	base_amount: 6,

    	// fetch 시도 간격 지정 (ms)
    	update_interval: 3000,

    	// fetch 사용 여부 (boolean)
    	use_fetch: true,

    	// fetch를 시도할 url
    	fetch_href: "/api/post",

    	// fetch를 시도할 method ("get" / "post")
    	fetch_method: "post",

    	// 각 아이템의 HTML onclick 속성 지정 (string, this.name => 데이터의 name 필드 반환)
    	on_click: "alert(this.name)",

    	// 데이터의 상태값 속성을 각 아이템에 class로 지정
    	class_map: {
    		cpu: {
    			//  필드명 : 지정할 클래스명
    			NORMAL: "normal",
    			WARN: "warning",
    			CRITICAL: "critical",
    		},
    		memory: {
    			NORMAL: "normal",
    			WARN: "warning",
    			CRITICAL: "critical",
    		},
    		disk: {
    			NORMAL: "normal",
    			WARN: "warning",
    			CRITICAL: "critical",
    		},
    		server: {
    			NORMAL: "normal",
    			ABNORMAL: "abnormal",
    		},
    	},

    	// 클래스를 바인딩 할 위치 특정 (생략시 body 밑에 새로운 개체 생성 후 바인딩)
    	binding_specify: {
    		server: "body",
    	},

    	// use_fetch가 false일 경우 불러올 데이터 (이후 fetch 실행 시 갱신됨)
    	dataList: {},
    });

    // init 함수 실행 이후 옵션 override 필요시:
    // gOrbit.options.[옵션] = "값";

    // init 이후 변경 가능한 옵션:
    // gOrbit.options.BASE_RADIUS
    // gOrbit.options.BASE_AMOUNT
    // gOrbit.options.USE_FETCH
    // gOrbit.options.FETCH_HREF
    // gOrbit.options.FETCH_METHOD
    // gOrbit.options.ON_CLICK
    // gOrbit.options.CLASS_MAP
