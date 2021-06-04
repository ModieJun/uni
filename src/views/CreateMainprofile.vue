<template>
  <div class="my-5 flex flex-col justify-center items-center">
    <div>
      <h2>Create Main Profile</h2>
    </div>
    <section
      class="max-w-md w-full shadow-lg rounded-sm p-5 flex flex-col space-y-5"
    >
      <form class="contents">
        <div
          v-if="error"
          class="bg-red-500 w-full py-1 italic font-bold text-sm text-center  rounded-sm"
        >!! {{error}}</div>
        <vue-form-generator :model="model" :schema="mainprofileSchema">
        </vue-form-generator>
        <button
          type="submit"
          class="inline btn-green btn-max"
          @click.prevent="submitProfile"
        >
          Create
        </button>
      </form>
    </section>
  </div>
</template>

<script>
import "vue-form-generator/dist/vfg.css";
import VueFormGenerator from "vue-form-generator";
export default {
  props: ["user"],
  components: {
    "vue-form-generator": VueFormGenerator.component,
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
            max: Date(),
          },
          {
            type: "input",
            inputType: "text",
            label: "Number",
            model: "phoneNumber",
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
      if (this.isAllCompleted) {
        let result = await this.$store.dispatch("addMainProfile", data);
        if (result) {
          this.$router.replace("/profile");
        } else {
          console.log("Appending to profile failture");
        }
      }else{
          this.error = "Form not completed";
      }
    },
  },
};
</script>
