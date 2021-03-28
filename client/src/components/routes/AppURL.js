class AppURL {

    home() {
        return '/'
    }

    login() {
        return '/login'
    }

    product() {
        return '/product'
    }

    create(name){
        return `/${name}/create`
    }

    category() {
        return '/category¬'
    }
}

export default new AppURL();
