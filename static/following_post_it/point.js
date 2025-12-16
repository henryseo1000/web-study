export class Point {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    add(point) { //점 두개를 서로 더한 값
        this.x += point.x;
        this.y += point.y;
        return this;
    }

    subtract(point) { //점의 빼기 연산
        this.x -= point.x;
        this.y -= point.y;
        return this;
    }

    reduce(value) { //점의 곱 연산
        this.x *= value;
        this.y *= value;
        return this;
    }

    collide(point, width, height) { 
        if (this.x >= point.x &&
            this.x <= point.x + width &&
            this.y >= point.y &&
            this.y <= point.y + height) {
                return true;
        } else {
            return false;
        }
    }

    clone() { //해당 점과 똑같은 값을 가진 점을 하나 더 만드는 것
        return new Point(this.x, this.y);
    }
}