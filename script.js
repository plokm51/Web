var vm = new Vue({
  el:"#app",
  data:{
    isCartOpen: false,
    movies:[],                  //電影陣列
    cart:[],                    //購物車陣列
    currentMovie: null,         //目前有的電影
  },
  created(){                      //抓url
    let apiUrl="movie.json"
    axios.get(apiUrl).then(res=>{
      this.movies=res.data
    })
  },
  methods:{
    bgcss(url){
      return {
        'background-image':'url('+url+')',
        'background-position':'center center',
        'background-size':"cover"        
      }
    },
    wheel(evt){           //這邊用來做卡片移到購物車的動畫
      console.log(evt.deltaY)
      TweenMax.to(".cards",0.8,{
        left: "+="+evt.deltaY*2+"px"
      })
    },
    addCart(movie,evt){
      var movieNumber = parseInt(document.getElementById('number').value);
      this.currentMovie= movie
      let target = evt.target
      this.$nextTick(()=>{
        TweenMax.from(".buybox",0.8,{
          left: $(evt.target).offset().left,
          top: $(evt.target).offset().top,
          opacity:1
        })
        setTimeout(()=>{
          for(var i=0;i<movieNumber;i++){
            this.cart.push(movie)
          }
        },800)

      })      
    },
    delCart(movie,evt){
      this.currentMovie=movie
      let target =evt.target
      this.cart.pull(movie)
    },
    clearCart(movie,evt){
      cart=[];
    }
  },
  computed:{
    totalPrice(){
      return this.cart
        .map(movie=>movie.price)
        .reduce((total,p)=>total+p,0)
    }
  },
  watch: {
    cart(){
      TweenMax.from(".fa-shopping-cart",0.3,{
        scale: 0.5
      })
    }
  }
})