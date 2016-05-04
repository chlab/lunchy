.PHONY: install run build migrate dev run-lean

install:
	pip install pip-tools
	pip-sync
	python setup.py develop
	npm install

run: migrate build
	python manage.py runserver

run-lean:
	python manage.py runserver	

dev:
	npm run dev

build:
	npm run build

migrate:
	python manage.py migrate