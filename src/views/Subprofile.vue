<template>
  <div class="flex flex-col max-w-screen">
    <h2>Subprofile ID: {{this.$route.params.id}}</h2>
    <div class="grid grid-cols-3 mt-5  ">
      <div class="col-span-1 flex flex-col bg-gray-200 p-5  rounded-l-lg">
        <h2>My Information/Files</h2>
        <div v-for="file in files" :key="file.filename">
          <Drag
            :data="file"
            type="file"
            class="rounded-md shadow-xl py-5 mt-2 text-white bg-blue-300 text-center transform duration-75 ease-linea hover:scale-105"
          >
            <h2>{{ file.filename }}</h2>
          </Drag>
        </div>
      </div>

      <!-- Input -->
      <div class="col-span-2 bg-blue-200 p-5 rounded-r-lg">
        <h2>To be filled</h2>
        <!-- Information needed to be filled for each -->
        <div>
          <div
            v-for="(req, index) in completionblocks"
            :key="index"
            class="flex flex-col space-y-2 w-full h-full mt-5"
          >
            <h2>{{ req.requirementName }}</h2>
            <Drop @drop="droppedFile($event, index)">
              <div
                class="flex mt-1 py-2 rounded-lg shadow-lg bg-gray-50 justify-center transform duration-500 ease-in hover:scale-105 hover:border-red-500"
              >
                <h2>{{ requiredItem(req) }}</h2>
              </div>
            </Drop>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Drag, Drop } from "vue-easy-dnd";
export default {
  name: "CreateSubprofile",
  components: {
    Drag,
    Drop,
  },
  methods: {
    log: function (e) {
      console.log(e);
    },
    droppedFile: function (event, index) {
      // when drop files receives the new file update it
      this.completionblocks[index].requirementItem = event.data;
    },
    requiredItem: function (req) {
      return req.requirementItem
        ? req.requirementItem.filename
        : "+" + req.requirementType;
    },
    dragOverDrop: function (event, index) {
      //when the drag component is over the drop zone.
      console.log(event.data);
      console.log(index);
      this.dragOverTemp[index] = event.data;
    },
  },
  data: function () {
    return {
      dragOverTemp: {},
      files: [
        {
          filename: "ABC.pdf",
          fileUrl: "something.com/asdfdfd.pdf",
          filetype: "pdf",
        },
        {
          filename: "CCF.pdf",
          fileUrl: "something.com/asdfdfd.pdf",
          filetype: "pdf",
        },
        {
          filename: "DEF.pdf",
          fileUrl: "something.com/asdfdfd.pdf",
          filetype: "pdf",
        },
      ],
      completionblocks: [
        {
          requirementName: "Personal Statement",
          requirementType: "docx/pdf",
          requirementItem: null,
        },
        {
          requirementName: "CV",
          requirementType: "docx/pdf",
          requirementItem: null,
        },
        {
          requirementName: "Reference Letter",
          requirementType: "docx/pdf",
          requirementItem: null,
        },
      ],
    };
  },
};
</script>