export default {
    logout(that){
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('route');
        that.$router.push({name:'login'});
    },
}