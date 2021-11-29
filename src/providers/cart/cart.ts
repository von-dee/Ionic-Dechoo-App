// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ApiRequestProvider } from '../../providers/api-request/api-request';
import { Storage } from '@ionic/storage';
import { SearchPipe } from '../../pipes/search/search';
import { SortPipe } from '../../pipes/sort/sort';


/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartProvider {

  productname:any; productprice:any; productimg:any; productcode:any; productphoto:any; url:any; currency:string="₵";
  cartcount:any; total_db:any; cartinfo:any;actions:any; data:any;itemquantity:any;item_quantity_num:any;item_exists: boolean = false;
  items:any; prclustercode:any; clustername:any; gottencartitem: any; cartiteminfo: any;gottenitem: any; beneficiarycode:any;
  descending: boolean = false;order: number;totalItems_db:any;



  constructor(public http: Http, public apiReq:ApiRequestProvider, public storage: Storage) {
    console.log('Hello CartProvider Provider');

    this.url=localStorage.getItem('PhotoUrl')+'/products/';
    this.productcode = localStorage.getItem('Productcode');
    this.productcode = localStorage.getItem('productname');
    this.clustername = localStorage.getItem('BranchCode');
    this.total_db = 0;    
    
  }


  count_me(){
    let count = localStorage.getItem('CartCount');
    if(count){
      this.cartcount = count;
    }else{
      this.cartcount = 0;
    }

    return this.cartcount;
  }

  loadData(){
    this.items =[];
    this.actions = "&actions=productfetch";
    this.data = "&prclustercode="+this.clustername;
    this.apiReq.postData(this.actions,this.data).then(res=>{
      let repo = JSON.parse(res['_body']);
      console.log(repo +' I have data!');
      if(repo.msg == 'true'){
        this.items = repo.data;
      }else{
        this.apiReq.errorToast('Network is slow');
      }
    })
  }

  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }


  addToCart(item,price){
    // Store pin in database
    this.storage.get('currentcart').then((gottenitems) => {
      if(gottenitems != null){

          this.cartcount = Number(this.cartcount) + 1;
          localStorage.setItem('CartCount',JSON.stringify(this.cartcount));
          this.cartinfo ={ itemname: item, itemprice: price }​​​​​​​;
          var cartinfostring = JSON.stringify(this.cartinfo);
          var newcartinfo = gottenitems + "," + cartinfostring;
          this.storage.set('currentcart', newcartinfo);
          this.apiReq.successToast('Product Added to Cart');
          console.log('Your cart items are ', newcartinfo);

      }else{
          this.cartcount = Number(this.cartcount) + 1;
          localStorage.setItem('CartCount',JSON.stringify(this.cartcount));
          this.cartinfo = { itemname: item, itemprice: price }​​​​​​​;
          this.cartinfo = JSON.stringify(this.cartinfo);
          this.storage.set('currentcart', this.cartinfo);
          this.apiReq.successToast('Product Added to Cart');
          console.log('Your cart item is stored');
      }
    });

    this.carttotal(price);
    this.cartItemsNum();

  }

  carttotal(price){
    // Store pin in database
    this.storage.get('pricetotal').then((gottenitems) => {
      if(gottenitems != null){

          this.total_db = Number(gottenitems) + Number(price); 
          this.storage.set('pricetotal', this.total_db);
          console.log('Total not new', this.total_db);

      }else{
         this.total_db = Number(price); 
         this.storage.set('pricetotal', this.total_db);
         console.log('Total ', this.total_db);
      }
    });
  }

  cartItemsNum(){
    // Store pin in database
    this.storage.get('cartItemsNum').then((gottenitems) => {
      if(gottenitems != null){
          this.totalItems_db = Number(gottenitems) + 1; 
          this.storage.set('cartItemsNum', this.totalItems_db);
          console.log('Total Items in cart Not New', this.totalItems_db);
      }else{
         this.totalItems_db = 1; 
         this.storage.set('cartItemsNum', this.totalItems_db);
         console.log('Total Items in cart Old', this.totalItems_db);
      }
    });
  }

  GetcartItemsNum(){
    // Store pin in database
    this.storage.get('cartItemsNum').then((gottenitems) => {
      if(gottenitems != null){
          this.totalItems_db = Number(gottenitems); 
      }
    });
  }


  checkout(action,data){

      this.apiReq.postData(action,data).then(res => {
        this.items=JSON.parse(res['_body']).response;
        console.log(this.items) ;
        if(this.items=='true'){
          this.storage.remove('currentcart');
          this.storage.remove('pricetotal');
          localStorage.removeItem('BeneficiaryName');
          localStorage.removeItem('WalletBalace');
          localStorage.removeItem('WalletCode');
          localStorage.removeItem('BeneficiaryID');
          localStorage.removeItem('BeneficiaryQRCODE');
        }else{
          this.apiReq.errorToast('Processing Error!');
        }
      }).catch(err=>{
        console.log(err);
      });
  }

  
  SetMapStatus(type){
    // Store pin in database
    if(type == "pending"){
      this.storage.set('mapstatus', "pending");
      console.log("Set map status to pending");
    }else{
      this.storage.set('mapstatus', "none");
      console.log("Set map status to none");
    }
    
  }

  


}
