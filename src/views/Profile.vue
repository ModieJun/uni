<template>
  <div class="flex flex-col overflow-hidden space-y-5">
    <div v-if="!profile" class="my-5">
      <router-link to="/editprofile" class="inline btn-light-blue btn-lg"
        >Add Main Profile</router-link
      >
    </div>
    <div class="contents" v-else>
      <!-- Basic Information -->
      <section id="mainInfo" class="flex flex-col my-2">
        <!-- {{user}} -->
        <h2 class="section-heading-xl">Basic Information</h2>
        <div class="profile-entry">
          <div class="px-2">
            <h2>Name</h2>
            <p>{{ this.profile.name }}</p>
          </div>
          <div class="px-2">
            <h2>Surname</h2>
            <p>{{ this.profile.surname }}</p>
          </div>
        </div>
        <div class="profile-entry">
          <div class="px-2">
            <h2>Nationality</h2>
            <p>{{ this.profile.nationality }}</p>
          </div>
          <div class="px-2">
            <h2>ID Number/Passport</h2>
            <p>{{ this.profile.id }}</p>
          </div>
          <div class="px-2">
            <h2>Date of Birth</h2>
            <p>{{ this.profile.dateOfBirth }}</p> 
          </div>
        </div>

        <!-- Contact Information -->
        <div class="profile-entry">
          <div class="px-2">
            <h2>Email</h2>
            <p>{{ this.user.email }}</p>
          </div>
          <div class="px-2">
            <h2>Phone Number</h2>
            <p>{{ this.profile.phoneNumber }}</p>
          </div>
        </div>
      </section>

      <!-- education -->
      <section class="flex flex-col my-2">
        <h2 class="section-heading-xl">Education</h2>
          <div class="profile-entry">
            <div class="px-2">
              <h2>University</h2>
              <p>{{ this.profile.education.university }}</p>
            </div>
            <div class="px-2">
              <h2>Degree</h2>
              <p>{{ this.profile.education.degree }}</p>
            </div>
            <div class="px-2">
              <h2>Programme</h2>
              <p>{{ this.profile.education.programme }}</p>
            </div>
          </div>
          <div class="profile-entry">
            <div class="px-2">
              <h2>GPA</h2>
              <p>{{ this.profile.education.gpa }}</p>
            </div>
            <div class="px-2">
              <h2>Start</h2>
              <p>{{ this.profile.education.dateStart }}</p>
            </div>
            <div class="px-2">
              <h2>End</h2>
              <p>
                {{ this.profile.education.dateEnd !== "" ? this.profile.education.end : "To be completed" }}
              </p>
          </div>
        </div>
      </section>
    </div>

    <!-- Subprofile components  -->
    <section class="w-full flex flex-col my-5" >
      <div class="flex flex-row space-x-2">
        <h2 class="section-heading-xl">Sub Profiles</h2>
        <router-link to="/createsubprofile" class="btn btn-green"
          >+ Create new profile</router-link
        >
      </div>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-2">
        <div
          class="p-5 shadow-xl rounded-lg bg-gray-300"
          v-for="(ref, index) in subprofiles"
          :key="ref.subprofile.univeristy"
        >
          <router-link
            :to="'subprofile/' + index"
            class="btn btn-light-blue text-center"
            >Link</router-link
          >
          <p>{{ ref }}</p>
          <button
            class="btn btn-red"
            @click.prevent="
              $store.dispatch('deleteSubprofile', { user: user, id: ref.id })
            "
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import {db} from '../firebase_conf'
import { mapGetters } from "vuex";
export default {
  name: "Profile",
  props: ["user"],
  computed: {
    ...mapGetters({
      profile: "profile",
      subprofiles: "subprofiles",
    }),
  },
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
            programme: "Computer Science",
            start: "12/12/2019",
            end: "",
            country: "Hong Kong",
            gpa: "3.5/5",
          },
        ],
        temp_subprofile: [
          {
            univeristy: "Hong Kong u",
            logo: "",
            created_at: "12/12/2021",
            status: "in progress",
          },
          {
            univeristy: "Poly U",
            logo: "",
            created_at: "12/12/2021",
            status: "in progress",
          },
          {
            univeristy: "MIT",
            logo: "",
            created_at: "12/12/2021",
            status: "submitted",
          },
        ],
      },
    };
  },
};
</script>

<style>
</style>