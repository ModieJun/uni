<template>
  <div class="flex flex-col overflow-hidden space-y-5">
    <section id="mainInfo" class="flex flex-col my-2">
      <h2 class="section-heading-xl">Basic Information</h2>
      <div class="profile-entry">
        <div class="px-2">
          <h2>Name</h2>
          <p>{{ this.profiledata.main.name }}</p>
        </div>
        <div class="px-2">
          <h2>Surname</h2>
          <p>{{ this.profiledata.main.surname }}</p>
        </div>
      </div>
      <div class="profile-entry">
        <div class="px-2">
          <h2>Nationality</h2>
          <p>{{ this.profiledata.main.nationality }}</p>
        </div>
        <div class="px-2">
          <h2>ID Number/Passport</h2>
          <p>{{ this.profiledata.main.id }}</p>
        </div>
        <div class="px-2">
          <h2>Date of Birth</h2>
          <p>{{ this.profiledata.main.dateOfBirth }}</p>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="profile-entry">
        <div class="px-2">
          <h2>Email</h2>
          <p>{{ this.profiledata.main.email }}</p>
        </div>
        <div class="px-2">
          <h2>Phone Number</h2>
          <p>{{ this.profiledata.main.phoneNumber }}</p>
        </div>
      </div>
    </section>

    <section class="flex flex-col my-2">
      <h2 class="section-heading-xl">Education</h2>
      <div
        v-for="education in profiledata.education"
        :key="education.university"
      >
        <div class="profile-entry">
          <div class="px-2">
            <h2>University</h2>
            <p>{{ education.university }}</p>
          </div>
          <div class="px-2">
            <h2>Degree</h2>
            <p>{{ education.degree }}</p>
          </div>
          <div class="px-2">
            <h2>Programme</h2>
            <p>{{ education.programme }}</p>
          </div>
        </div>
        <div class="profile-entry">
           <div class="px-2">
            <h2>GPA</h2>
            <p>{{ education.gpa }}</p>
          </div> 
           <div class="px-2">
            <h2>Start</h2>
            <p>{{ education.start}}</p>
          </div> 
           <div class="px-2">
            <h2>End</h2>
            <p>{{ education.end !=="" ?education.end : "To be completed" }}</p>
          </div> 
        </div>
      </div>
    </section>

    <!-- Subprofile components  -->
    <section class="w-full flex flex-col my-5">
        <h2 class="section-heading-xl">Sub Profiles</h2>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-2">
            <div class="p-5 shadow-xl rounded-lg bg-gray-300" v-for="(subprofile,index) in profiledata.subprofiles" :key="subprofile.univeristy+subprofile.created_at">
              <router-link :to="'subprofile/'+index">Link</router-link>
                <p>{{subprofile}}</p>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data: function () {
    return {
      profiledata: {
        main: {
          name: "Junjie",
          surname: "LIN",
          id: "123123",
          nationality: "Hong Kong",
          dateOfBirth: "12/12/2012",
          phoneNumber: "87873232",
          email: "asdfhasdfh@gmail.com",
        },
        education: [
          {
            university: "City Universtiy",
            degree: "Bachelors in Science",
            programme:"Computer Science",
            start: "12/12/2019",
            end: "",
            country: "Hong Kong",
            gpa: "3.5/5",
          },
        ],
        subprofiles:[
            {univeristy:"Hong Kong u",logo:"",created_at:"12/12/2021",status:"in progress"},
            {univeristy:"Poly U",logo:"",created_at:"12/12/2021",status:"in progress"},
            {univeristy:"MIT",logo:"",created_at:"12/12/2021",status:"submitted"}
        ]
      },
    };
  },
};
</script>

<style>
</style>