FROM python:3.10.5-slim-buster

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

CMD [ "gunicorn","-w", "2", "--threads", "4" , "-b", "0.0.0.0:5000", "run:app" ]