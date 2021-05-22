<template>
  <div class="my-5">
    <h2 class="text-lg font-bold text-center">Create a new Subprofile</h2>
    <div class="container mx-auto max-w-2xl w-full p-5 shadow-lg">
      <form-wizard
        title="Subprofile creation"
        subtitle="Select the university"
        nextButtonText="Next"
        backButtonText="Back"
        finishButtonText="Create"
        shape="tab"
        @on-complete="createSubprofile"
      >
        <tab-content title="Step1" lazy="true">
          <vue-form-generator
            :model="model"
            :schema="firstTabSchema"
            ref="firstTab"
          ></vue-form-generator>
        </tab-content>
        <tab-content title="Step2" lazy="true">
          <div class="w-full">
            <h2>Upload related files</h2>
            <vue-form-generator :model="model" :schema="secondTabSchema">
            </vue-form-generator>
          </div>
        </tab-content>
      </form-wizard>
    </div>
  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import VueFormGenerator from "vue-form-generator";
export default {
  name: "CreateSubprofile",
  components: {
    FormWizard,
    TabContent,
    "vue-form-generator": VueFormGenerator.component,
  },
  methods:{
    createSubprofile:function(){
      alert("Submittion complete");
      //submit to firebase + display loading progress -> the push router to hom 
      this.$router.replace("/profile")
    }
  },
  data: function () {
    return {
      model: {
        university: "",
        level:"",
        prefix: false,
      },
      firstTabSchema: {
        fields: [
          {
            type: "select",
            label: "University",
            model: "university",
            values: [
              "City University of Hong Kong",
              "Polytechnic University of Hong Kong",
              "Hong Kong University",
              "Hong Kong University of Science & Technology",
            ],
            validator: VueFormGenerator.validators.string,
            required: true,
          },
          {
            type:"select",
            label:"Level",
            model:"level",
            values:["Bachelor","Masters","PHD","Doctor"]
          }
        ],
      },
      secondTabSchema: {
        fields: [
          {
            type: "checkbox",
            label: "Prefix Files",
            model: "prefix",
            default:false,
            styleClasses:"flex flex-row space-x-2"
          },
        ],
      },
    };
  },
};
</script>

<style>
</style>