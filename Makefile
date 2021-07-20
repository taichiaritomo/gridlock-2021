# Run "make python" in terminal to host the site locally at 0.0.0.0:8000
python:
	python -m SimpleHTTPServer
sass:
	sass --watch style.sass:style.css