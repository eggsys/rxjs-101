import { Observable } from "rxjs";

const observable = new Observable((subscriber)=> {
	subscriber.next(10);
    subscriber.next(11);
    subscriber.next(12);
});


const observer = {
	next: (value: any)=>{
		console.log("observer got a value of", value);
    },
    error: (value: any)=>{
		console.log("observer got an error of", value);
    },
    complete: (value: any)=>{
        console.log("observer got a complete notification", value);
    }
};  



observable.subscribe(observer);

// ## SAME RESULT ##

// observable.subscribe({
//     next: (value: any)=>{
//         console.log("This what we got : ", value);
//     }
// });