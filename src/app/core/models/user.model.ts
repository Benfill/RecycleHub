interface User {
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  address:string;
  city:string;
  phone:string;
  birth:string;
  picture:string|null,
  type: 'collector' | 'individual'
}
