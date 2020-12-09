function Promise(executor) {
    var self = this
    self.status = 'pending'
    self.data = undefined
    self.onResolvedCallback = []
    self.onRejectedCallback = []

    try{
        executor(resolve.bind(this), reject.bind(this))
    }catch(e){
        reject.bind(this)(e)
    }
}

function resolve(value) {
    if (self.status === 'pending') {
        self.status = 'resolved'
        self.data = value

        for(var i = 0; i < self.onResolvedCallback.length; i++) {
            self.onResolvedCallback[i](value)
        }
    }
}

function reject(reason) {
    if (self.status === 'pending') {
        self.status = 'rejected'
        self.data = reason

        for(var i = 0; i < self.onRejectedCallback.length; i++) {
            self.onRejectedCallback[i](reason)
        }
    }
}