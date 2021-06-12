<template>
  <div class="container mx-auto flex justify-center align-items-center my-10" v-if="this.isLoading">
    <half-circle-spinner
        :animation-duration="1000"
        :size="60"
        :color="'#ff1d5e'"
     />
  </div>
  <div class="flex flex-col max-w-screen" v-else>
    <h2>Subprofile ID: {{ this.$route.params.id }}</h2>
    <div class="grid grid-cols-3 mt-5">
      <div class="col-span-1 flex flex-col bg-gray-200 p-5 rounded-l-lg">
        <h2>My Information/Files</h2>
        <div v-for="file in files" :key="file.filename">
          <Drag
            :data="file"
            type="file"
            class="
              rounded-md
              shadow-xl
              py-5
              mt-2
              text-white
              bg-blue-300
              text-center
              transform
              duration-75
              ease-linea
              hover:scale-105
            "
          >
            <h2>{{ file.filename }}</h2>
          </Drag>
        </div>
        <Drop>
          <button class="bg-white hover:bg-gray-300 btn my-5 ">+ Add File/Drag FIle here</button>
        </Drop>
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
                class="
                  flex
                  mt-1
                  py-2
                  rounded-lg
                  shadow-lg
                  bg-gray-50
                  justify-center
                  transform
                  duration-500
                  ease-in
                  hover:scale-105
                  hover:border-red-500
                "
              >
                <h2>{{ requiredItem(req) }}</h2>
              </div>
            </Drop>
          </div>
        </div>
      </div>
      <div class="col-span-3 my-2 flex flex-row space-x-2 justify-evenly">
        <button class="btn-light-blue btn-lg" @click.prevent="save">
          Save
        </button>
        <button class="btn-green btn-lg" @click.prevent="submit">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Drag, Drop } from "vue-easy-dnd";
import { mapGetters } from "vuex";
export default {
  name: "CreateSubprofile",
  components: {
    Drag,
    Drop,
  },
  mounted() {
    if (!this.isLoading) {
      this.setCompletionBlock();
    }
  },
  beforeUpdate() {
    if(this.completionblocks.length===0 && !this.isLoading){ // if there is nothing in thedata and the data is loaded in the stor e
      this.setCompletionBlock();
    }
  },
  methods: {
    save() {
      console.log("save for next time");
      // prepare subprofile
      this.$store.dispatch("updateSubprofile", {
        id: this.$route.params.id,
        completionblocks: this.completionblocks,
      });
    },
    submit() {
      console.log("Submit to the universtiy ");
    },
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
    setCompletionBlock() {
      if (this.completionblocks.length===0){
        // if the completion blocks is empty from the refresh 
        this.completionblocks = JSON.parse(
          JSON.stringify(this.getSubprofileByID.subprofile.completionblocks)
        );
      }
    },
  },
  computed: {
    ...mapGetters({
      getSubprofile: "subprofileByID",
    }),
    getSubprofileByID() {
      // subprofile object and not an array
      const id = this.$route.params.id;
      return this.getSubprofile(id);
    },
    isLoading() {
      return this.getSubprofileByID === null;
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
      completionblocks: [],
    };
  },
};
</script>