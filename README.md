##온라인 상점 프로젝트 계획

Frontend 
-HTML,CSS,JS

Backend
-Node , Express, MongoDB

Customer Sites(고객 대면 사이트)
-제품을 보고 장바구니에 담고 , 장바구니에 제품 추가하거나 삭제할수있게 만든다.
Admin Sites(관리자 사이트)
-특정 사용자만 액세스 가능/ 관리자만 관리자 페이지를 방문할수있게한다.

##Viwe 계획

(공통 페이지)
-가입과 로그인 페이지 (관리자는 로그인 필요, 사용자는 구입할때 로그인 필요)

(사용자)
-모든 제품과 특정 제품에 대한 세부 정보를 볼 수 있어야한다.
-장바구니에 제품을 추가할 수 있어야하고, 징비구니에 있는 제품을 편집가능한 장바구니
-주어진 제품의 항목 수를 늘리거나 줄이거나 할 수 있어야한다.
-주문한 제품을 볼 수 있어야한다.
-주문 후 오류 페이지나 성공 또는 실패 패이지 구축

(관리자)
-사용자가 방문하면 관리자에게 표시되도록 구축 
-상점에서 현재 제공되는 모든 제품을 볼수있는 페이지에 새로운제품 추가 기존제품 업데이트
-모든 사용자에 모든 주문을 볼 수 있는 페이지 구축 (해당 주문 업데이트 가능)


##Data Entities(Models)
-User
 1.Email
 2.Password
 3.isAdmin(일반 고객인지 관리자인지 제어)
 4.name
 5.address

-Product(제품)
 1.Name
 2.Summary
 3.price
 4.image
 5.description

-Cart(장바구니)
 1.Items
 2.total price
 3.number of items

-Order(주문)
 1.User data
 2.products/cart data
 3.date
 4.status
 




