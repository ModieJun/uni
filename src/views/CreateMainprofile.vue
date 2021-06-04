<template>
  <div class="my-5 flex flex-col justify-center items-center">
    <div>
      <h2>Create Main Profile</h2>
    </div>
    <section
      class="max-w-md w-full shadow-lg rounded-sm p-5 flex flex-col space-y-5"
    >
      <form>
        <vue-form-generator :model="model" :schema="mainprofileSchema">
        </vue-form-generator>
        <button type="submit" class="btn-green" @click.prevent="submitProfile">
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
    submitProfile: function () {
        console.log(this.isAllCompleted);
        console.log(this.model)
    },
  },
};
</script>
