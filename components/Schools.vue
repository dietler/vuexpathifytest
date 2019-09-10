<template>
  <div class="component counter">
    <h1>Schools:</h1>
    <div>
      <button @click="setArraySchools">setArraySchools</button>
      <button @click="setQlikSchools">setQlikSchools</button>
    </div>
    <h2>List:</h2>
    <ul>
      <li v-for="school in list">{{school.name}} - ({{school.slug}})</li>
    </ul>
  </div>
</template>

<script>
import { get } from "vuex-pathify";

import enigma from "enigma.js";
import qixSchema from "enigma.js/schemas/12.170.2.json";

console.log("COMPONENT LOADED!");
export default {
  fetch() {},
  computed: {
    // wildcards can be problematic as state needs to exist before creating
    ...get("schools/*")
  },
  methods: {
    setArraySchools() {
      // use automatically-created commits
      let schoolList = [
        { name: "School One", slug: "slugone" },
        { name: "School Two", slug: "slugtwo" },
        { name: "School Three", slug: "slugthree" }
      ];
      this.$store.set("schools/list", schoolList);
    },
    setQlikSchools() {
      console.log("AD4");
      const config = {
        schema: qixSchema,
        // IPC QAP
        url: "wss://qap.ipc-global.com/app/engineData",
        appId: "7bd852d1-8858-42bb-b2d7-057084f1db3c"
        // Local
        // url: 'ws://localhost:4848/app/engineData',
        // appId: 'School Profiles (Live Version) [v1.4.0].qvf'
      };

      var session = enigma.create(config);

      const schoolHyperCube = {
        qInfo: { qType: "visualization" },
        qHyperCubeDef: {
          qDimensions: [
            {
              qDef: {
                qFieldDefs: ["Proper School Name"],
                qSortCriterias: [{ qSortByLoadOrder: 0, qSortByAscii: 1 }]
              },
              qNullSuppression: true
            },
            {
              qDef: {
                qFieldDefs: ["School Slug"]
              },
              qNullSuppression: true
            },
            {
              qDef: {
                qFieldDefs: ["Sector"]
              },
              qNullSuppression: true
            },
            {
              qDef: {
                qFieldDefs: ["Current Network"]
              },
              qNullSuppression: true
            },
            // {
            //   qDef: {
            //     qFieldDefs: ['Study Area'] //TODO: Find correct name
            //   },
            //   qNullSuppression: true
            // },
            {
              qDef: {
                qFieldDefs: ["Current City Council District"]
              },
              qNullSuppression: true
            },
            {
              qDef: {
                qFieldDefs: ["Admission Type"]
              },
              qNullSuppression: true
            },
            {
              qDef: {
                qFieldDefs: ["School Level"]
              },
              qNullSuppression: true
            }
          ],
          qMeasures: [],
          qInitialDataFetch: [{ qWidth: 10, qHeight: 500 }]
        }
      };

      console.log("AD3");
      let searchResults = [];
      session
        .open()
        .then(function(global) {
          return global.openDoc(config.appId);
        })
        .then(function(engine) {
          engine.createSessionObject(schoolHyperCube).then(schools => {
            schools
              .getLayout()
              .then(
                schools
                  .getLayout()
                  .then(layout => {
                    const values = layout.qHyperCube.qDataPages[0].qMatrix;
                    for (let m = 0; m < values.length; m++) {
                      searchResults.push({
                        name: values[m][0]["qText"],
                        slug: values[m][1]["qText"],
                        slugid: parseInt(values[m][1]["qElemNumber"], 0),
                        sector: values[m][2]["qText"],
                        network: values[m][3]["qText"],
                        // studyarea: values[m][4]['qText'],
                        councildistrict: values[m][4]["qText"],
                        admissiontype: values[m][5]["qText"],
                        schoollevel: values[m][6]["qText"]
                      });
                    }
                    console.log("AD1",searchResults);
                    this.$store.set("schools/list", searchResults);
                  })
                  .then(() => {
                    console.log("AD2");
                    this.$store.set("schools/list", searchResults);
                  })
              )
              .catch(err => console.log(err));
          });
        });
    }
  }
};
</script>

<style scoped>
button {
  margin: 2px;
}
</style>