const constant = {
  USER: "",
  EMAIL_ID: "",

  COOKIE: {
    HEADER: "@#$%^AZ##",
  },

  ROUTES: {
    INDEX: "/",
    // add more routes here
  },

   BASE_URL: "http://192.168.29.176:3001",

  //  SOFTWARE_URL: "https://insurance.digibima.com/",

  API: {
    USER: {
      SENDOTP: "/api/user/sendotp",
      VERIFYOTP: "/api/user/verifyotp",
      //  SENDOTP: "/api/sendotp",
      // VERIFYOTP: "/api/verifyotp",
       PINCODE: "/api/acpincode",
      USERINQUIRE: "/api/user/inquiry",
      USERLOGIN: "/api/motor/vehicle-type-select",
    },

    ADMIN: {
      ADMINLOGIN: "/api/admin/login",
      SENDOTP: "/api/user/sendotp",
      VERIFYOTP: "/api/user/verifyotp",
    },
    BLOG:"/api/user/blog",
    SINGLEBLOG:"/api/user/blog-show",
    DELETEBLOG:"/api/user/delete",
    TRASHBLOG:"/api/user/trash"
  },
};

export default constant;
