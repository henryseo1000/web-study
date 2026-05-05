from flask_login import LoginManager;
from flask import Flask, request, render_template, make_response, redirect, url_for;

app = Flask("__name__");

#영화 데이터 목록
movieList = [
    {
        "title": "하츄핑", 
        "date": "2024-01-01"
    },
    {
        "title": "행복의 나라", 
        "date": "2024-02-02"
    },
    {
        "title": "인어공주", 
        "date": "2024-03-03"
    },
    {
        "title": "빅토리", 
        "date": "2024-04-04"
    }
];

@app.route("/login_success")
def loginSuccess() :
    return "login success!";

@app.route("/login_form")
def loginForm():
    user_cookie = request.cookies.get('userIDCookie');

    if user_cookie != None : 
        return redirect(url_for('loginSuccess'));

    else :
        return render_template("/api_request_study/index.html");

@app.route("/login_req", methods=['POST'])
def loginReq():
    user_id = request.form['id']

    if user_id == "henry" :
        return redirect(url_for('loginSuccess'));

    else :
        return 'login failed';


@app.route("/login_req_cookie", methods=['POST'])
def loginReqCookie():
        user_id = request.form['id'];

        if user_id == "henry" :
            res = make_response(redirect(url_for('loginSuccess')));
            res.set_cookie('userIDCookie', user_id);
            return res;

        else :
            return 'login failed';

@app.route("/movie_date", methods=['GET']) # 왼쪽 경로로 GET 요청을 보낼 수 있습니다.
def getMovieDate():
    movieName = request.args.get('name'); # 요청한 파라메터 중 name이라는 요소를 가져와 movieName에 저장합니다.

    # movieList를 반복해 돌면서, movieList의 각 요소가 data에 들어갑니다.
    for data in movieList :
        if data['title'] == movieName : #data의 title값이 우리가 요청한 name으로 넘겨준 값(movieName)과 같을 때, data의 date를 반환하여 줍니다.
            return data['date'];

    return "개봉일을 찾지 못했습니다."; #만약 찾고자 하는 영화가 없다면 개봉일을 찾을 수 없다고 띄워줍니다.

@app.route("/add_movie", methods=['POST']) # 왼쪽에 있는 경로로 POST 요청을 보낼 수 있도록 합니다.
def addMovie():
    movieName = request.args.get('name'); # POST 요청 시 파라메터 name의 값을 받아 movieName에 저장
    movieDate = request.args.get('date'); # POST 요청 시 파라메터 date의 값을 받아 movieDate에 저장

    movieList.append({"title" : movieName, "date" : movieDate}); # 객체의 title에 movieName을 넣고, date에 movieDate를 넣어 movieList의 앞에 추가
    return movieList; # 응답으로 movieList를 보내줍니다.

@app.route("/delete_movie", methods=['DELETE'])
def deleteMovie():
    movieName = request.args.get('name'); # 요청한 파라메터 중 name이라는 요소를 가져와 movieName에 저장합니다.

    # movieList를 반복해 돌면서, movieList의 각 요소가 data에 들어갑니다.
    for data in movieList :
        if data['title'] == movieName : #data의 title값이 우리가 요청한 name으로 넘겨준 값(movieName)과 같을 때, data의 date를 반환하여 줍니다.
            movieList.remove(data);
    
    return movieList;

@app.route("/big") # 경로로 이동할 경우
def hello_big():
    return "<h1>hello</h1>"; # hello + h1태그가 포함된 문자열을 얻음

@app.route("/") # 기본 경로로 이동할 경우
def hello_small():
    return "hello"; # hello 문자열을 얻음

if __name__ == '__main__':  
   app.run('127.0.0.1', port=5001, debug=True)