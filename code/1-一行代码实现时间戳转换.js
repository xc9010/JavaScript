function time(time = +new Date()) {
    var t = new Date(time + 8*3600*1000);
    return t.toJSON().substr(0, 19).replace('T', ' ');
}

time();