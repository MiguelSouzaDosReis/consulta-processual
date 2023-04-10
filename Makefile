.PHONY: run
run:
	TARGET=build docker-compose up --build

.PHONY: test
test:
	TARGET=test docker-compose up --build
	