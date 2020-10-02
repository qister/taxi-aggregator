app-run:
	cd server;\
		npm run dev;

client-retail-install:
	cd client-retail;\
		npm i;

client-business-install:
	cd client-business;\
		npm i;

server-install:
	cd server;\
		npm i;

install-all:
	make server-install
	make client-business-install
	make client-retail-install

app-init:
	make install-all
	make app-run

