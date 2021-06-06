<template>
  <div class="my-2 flex flex-col justify-center items-center">
    <section
      class="max-w-md w-full shadow-lg rounded-sm p-5 flex flex-col space-y-5"
    >
      <form-wizard
        title="Create profile"
        subtitle="Set your profile information"
        nextButtonText="Next"
        backButtonText="Back"
        finishButtonText="Finish"
        shape="tab"
        @on-complete="this.profileExist ? submitProfile : editProfile"
      >
        <tab-content title="Personal Information" lazy="true">
          <vue-form-generator :model="model" :schema="mainprofileSchema">
          </vue-form-generator>
          <!-- <button
            type="submit"
            class="inline btn-green btn-max"
            @click.prevent="submitProfile"
          >
            Create
          </button> -->
        </tab-content>
        <tab-content title="Education" lazy="true">
          <vue-form-generator
            :model="model.education"
            :schema="educationSchema"
          ></vue-form-generator>
        </tab-content>
      </form-wizard>
      <form class="contents">
        <div
          v-if="error"
          class="bg-red-500 w-full py-1 italic font-bold text-sm text-center rounded-sm"
        >
          !! {{ error }}
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import VueFormGenerator from "vue-form-generator";
import { FormWizard, TabContent } from "vue-form-wizard";
export default {
  props: ["user"],
  components: {
    "vue-form-generator": VueFormGenerator.component,
    FormWizard,
    TabContent,
  },
  computed: {
    isAllCompleted: function () {
      return (
        this.model.name !== "" &&
        this.model.surname !== "" &&
        this.model.id !== "" &&
        this.model.nationality !== "" &&
        this.model.dateOfBirth !== "" &&
        this.model.phoneNumber !== ""
      );
    },
    isEducationDateValid: function () {
      if (
        this.model.education.dateStart !== "" &&
        this.model.education.dateEnd !== ""
      ) {
        return (
          new Date(this.model.education.dateStart) <
          new Date(this.model.education.dateEnd)
        );
      }
      return false;
    },
    profileExist: function () {
      return this.$store.getters.profile != null;
    },
  },
  mounted() {
    //get the profile from profile - if there is profile in the store
    //   console.log(this.$store.getters.profile);
    if (this.profileExist) {
      this.model = this.$store.getters.profile;
    }
  },
  data: function () {
    return {
      error: null,
      model: {
        name: "",
        surname: "",
        id: "",
        nationality: "",
        dateOfBirth: "",
        phoneNumber: "",
        education: {
          university: "",
          degree: "",
          programme: "",
          gpa: "",
          dateStart: "",
          dateEnd: "",
        },
      },
      mainprofileSchema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: "Name",
            model: "name",
            validator: VueFormGenerator.validators.string,
          },
          {
            type: "input",
            inputType: "text",
            label: "Surname",
            model: "surname",
            validator: VueFormGenerator.validators.string,
          },
          {
            type: "input",
            inputType: "text",
            label: "ID",
            model: "id",
            validator: VueFormGenerator.validators.string,
          },
          {
            type: "select",
            label: "Nationality",
            model: "nationality",
            values: ["China Mainland", "Hong Kong", "Macau", "ABC"],
          },
          {
            type: "input",
            inputType: "date",
            label: "Date of Birth",
            model: "dateOfBirth",
            validator: "date",
            format: "YYYY-MM-dd",
            max: new Date().toString,
          },
          {
            type: "input",
            inputType: "tel",
            label: "Phone",
            model: "phoneNumber",
          },
        ],
      },
      educationSchema: {
        fields: [
          {
            type: "select",
            label: "University",
            mode: "university",
            values: ["City University of Hong Kong", "Hong Kong University"],
          },
          {
            type: "select",
            label: "Level",
            model: "degree",
            values: ["Bachelor", "Masters", "PHD", "Doctor"],
          },
          {
            type: "input",
            inputType: "text",
            label: "GPA",
            model: "gpa",
          },
          {
            type: "input",
            inputType: "date",
            label: "Date Start",
            model: "dateStart",
            validator: "date",
            format: "YYYY-MM-dd",
            max: "2021-12-12", //TODO - fix restrictions for date pickers  yyyy-mm-dd
          },
          {
            type: "input",
            inputType: "date",
            label: "Date End",
            model: "dateEnd",
            validator: "date",
            format: "YYYY-MM-dd",
            max: "2021-12-12", //TODO - fix restrictions for date pickers  yyyy-mm-dd
          },
        ],
      },
    };
  },
  methods: {
    submitProfile: async function () {
      let data = {
        user: this.user,
        profile: this.model,
      };
      if (this.isAllCompleted && this.isEducationDateValid) {
        let result = await this.$store.dispatch("addMainProfile", data);
        if (result) {
          this.$router.replace("/profile");
        } else {
          console.log("Appending to profile failture");
        }
        return;
      }
      if (!this.isAllCompleted) {
        this.error = "Please complete the form ";
      }
      if (!this.isEducationDateValid) {
        this.error = "Education start date cannot be after the end date";
      }
    },
    editProfile: function () {
      console.log("edit profile");
    },
    temp: function () {
      console.log("finish");
      console.log(this.isEducationDateValid);
    },
  },
};
</script>
