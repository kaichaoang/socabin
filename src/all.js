// // Your web app's Firebase configuration
// var firebaseConfig = {
//   apiKey: "AIzaSyAuOc73L9G1yAA4D3xHpBWaYSLZO-5Tjr8",
//   authDomain: "orbital-cabb2.firebaseapp.com",
//   databaseURL: "https://orbital-cabb2.firebaseio.com",
//   projectId: "orbital-cabb2",
//   storageBucket: "orbital-cabb2.appspot.com",
//   messagingSenderId: "936108917415",
//   appId: "1:936108917415:web:4ce3176446367759c01182",
//   measurementId: "G-XETM90MC13",
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// //make auth ref
// const auth = firebase.auth();

// //Database
// const database = firebase.database();

// //user
// var currUser = firebase.auth().currentUser;

// //stores user data, index 0 is email ,index 1 is name, index 2 is role
// //index 3 is yearandmajor
// var currUserInfo = new Array();

// firebase.auth().onAuthStateChanged(function (user) {
//   if (user) {
//     // User is signed in.
//     console.log("gt user");
//     currUserInfo[0] = user.email;
//   } else {
//     // No user is signed in.
//     console.log("no user");
//     users = new Array();
//   }
// });










// //-----------------------successful applications------------------------
// const viewTutorProfile = document.querySelector("#view-tutor-profile-button");

// if (viewTutorProfile != null) {
//   viewTutorProfile.addEventListener(
//     "click",
//     (e) => {
//       e.preventDefault();
//       tryViewTutorProfile();
//     },
//     false
//   );
// }

// async function tryViewTutorProfile() {
//   if (currUserInfo[2] == "Student/Tutor") {
//     window.location.replace("/tutorprofile.html");
//   } else if (currUserInfo[2] == "Student") {
//     window.alert(
//       "You are NOT a tutor yet! Please apply if you wish to be one!"
//     );
//   }
// }
// //-----------------------end of successful applications------------------------



// //-----------------------------edit tutor profile------------------------------
// //referencing
// var ref = database.ref("tutors");
// ref.on("value", getTutorData, errData);

// function getTutorData(data) {
//   try {
//     var users_data = data.val();
//     var users = Object.keys(users_data);

//     //data extraction
//     for (var i = 0; i < users.length; i++) {
//       //data extraction
//       var registered_name = users[i];

//       //links the correct data to the correct tutor
//       var pref_timings = users_data[registered_name].pref_timings;
//       var pref_fees = users_data[registered_name].pref_fees;
//       var add_info = users_data[registered_name].add_info;

//       var modules = users_data[registered_name].modules;

//       //setting default values
//       document.getElementById("edit-mod-one").defaultValue = modules[0][0];
//       document.getElementById("edit-grade-one").defaultValue = modules[0][1];

//       if (modules[1]) {
//         document.getElementById("edit-mod-two").defaultValue = modules[1][0];
//         document.getElementById("edit-grade-two").defaultValue = modules[1][1];
//         if (modules[2]) {
//           document.getElementById("edit-mod-two").defaultValue = modules[1][0];
//           document.getElementById("edit-grade-two").defaultValue =
//             modules[1][1];
//           document.getElementById("edit-mod-three").defaultValue =
//             modules[2][0];
//           document.getElementById("edit-grade-three").defaultValue =
//             modules[2][1];
//         }
//       }
//       document.getElementById("edit-pref-timings").defaultValue = pref_timings;
//       document.getElementById("edit-pref-fees").defaultValue = pref_fees;
//       document.getElementById("edit-add-info").defaultValue = add_info;
//     }
//   } catch (err) {
//     //have not found out how to deal with empty path yet, but editting works
//     console.log(err.message);
//   }
// }

// const updateTutorData = document.querySelector("#edit-tutor-profile");

// //updates data upon clicked
// if (updateTutorData != null) {
//   updateTutorData.addEventListener("submit", (e) => {
//     e.preventDefault();
//     tryUpdateTutorData();
//   });
// }

// async function tryUpdateTutorData() {
//   try {
//     const mod_one = updateTutorData["edit-mod-one"].value;
//     const grade_one = updateTutorData["edit-grade-one"].value;
//     const mod_two = updateTutorData["edit-mod-two"].value;
//     const grade_two = updateTutorData["edit-grade-two"].value;
//     const mod_three = updateTutorData["edit-mod-three"].value;
//     const grade_three = updateTutorData["edit-grade-three"].value;
//     const pref_timings = updateTutorData["edit-pref-timings"].value;
//     const pref_fees = updateTutorData["edit-pref-fees"].value;
//     const add_info = updateTutorData["edit-add-info"].value;
//     var modArr = [[mod_one, grade_one]];

//     if (mod_two.trim() != "") {
//       modArr[1] = [mod_two, grade_two];
//       if (mod_three.trim() != "") {
//         modArr[2] = [mod_three, grade_three];
//       }
//     }

//     //updates all child nodes
//     firebase
//       .database()
//       .ref("tutors/" + currUserInfo[1])
//       .update({
//         modules: modArr,
//         pref_timings: pref_timings,
//         pref_fees: pref_fees,
//         add_info: add_info,
//       });

//     window.alert(
//       "Updated successfully! Returning you to your tutor profile..."
//     );
//     window.location.replace("/tutorprofile.html");
//   } catch (err) {
//     console.log(err.message);
//   }
// }

// function errData(err) {
//   console.log("error");
//   console.log(err);
// }

// //--------------------------end of edit tutor profile---------------------------
