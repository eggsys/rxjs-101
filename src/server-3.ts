import { filter, map, Observable, pluck } from "rxjs";

interface IData {
  status: "active"|"inactive";
  age: number;
}

interface IUser {
  data: IData[];
}
const users:IUser = {
  data: [
    {
      status: "active",
      age: 14,
    },
    {
      status: "inactive",
      age: 32,
    },{
      status: "active",
      age: 19,
    },{
      status: "active",
      age: 20,
    },{
      status: "inactive",
      age: 14,
    },{
      status: "inactive",
      age: 11,
    },{
      status: "active",
      age: 52,
    },{
      status: "inactive",
      age: 3,
    },
  ],
};

const users2:IUser = {
  data: [
    {
      status: "active",
      age: 14,
    },
    {
      status: "inactive",
      age: 10,
    },{
      status: "active",
      age: 19,
    },{
      status: "active",
      age: 20,
    },{
      status: "inactive",
      age: 14,
    },{
      status: "inactive",
      age: 11,
    },{
      status: "active",
      age: 10,
    },{
      status: "inactive",
      age: 3,
    },
  ],
};

const observable: Observable<any> = new Observable((subscriber) => {
  // ## SCENARIO 1 MEET ERROR
  subscriber.next(users);
  subscriber.next(users2); 
  //THROW ERROR NEXT subscriber will not process
  subscriber.next(users);


  // // ## SCENARIO 2 MEET COMPLETE 
  // subscriber.next(users);
  // subscriber.complete();
  // //COMPLETE NEXT subscriber will not process
  // subscriber.next(users);


}).pipe(

  map((value:any)=>{
    // console.log("1) got data from observable", value);
    return value.data;
  }),

  map((value:any)=>{
    // console.log("2) got data from first operator", value);
    return value.filter(user=> user.status === "active");
  }),
  map((value:any)=>{
    // console.log("3) got data from second operator", value);
    return value.reduce((sum: number, user)=> sum + user.age, 0)/ value.length;
  }),
  map((value:any)=>{
    // console.log("4) got data from third operator", value);
    if(value < 26) throw new Error("Average is too young");
    else return value;
  })
);


const observer = {
  next: (value: any) => {
    console.log("observer got a value of", value);
  },
  error: (err: any) => {
    console.error("observer got an error of", err);
  },
  complete: (value: any) => {
    console.log("observer got a complete notification");
  },
};

observable.subscribe(observer);

// ## SAME RESULT ##

// observable.subscribe({
//     next: (value: any)=>{
//         console.log("This what we got : ", value);
//     }
// });
