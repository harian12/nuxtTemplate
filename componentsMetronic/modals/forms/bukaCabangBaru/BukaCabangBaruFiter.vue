<template>
  <div
    class="modal fade"
    tabindex="-1"
    id="kt_BukaCabangBaruFiter"
    ref="BukaCabangBaruFiterRef"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Filter</h3>
          <div
            class="btn btn-icon btn-sm btn-active-icon-primary active"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
        </div>
        <el-form @submit.prevent="searchItems()">
          <div class="modal-body py-10 px-lg-17">
            <div class="row mb-2">
              <div class="col-3">
                <label for="" style="font-size: 16px">Company </label>
              </div>
              <div class="col-9">
                <Multiselect
                  v-model="filter.company"
                  :searchable="true"
                  :close-on-select="false"
                  :groups="true"
                  mode="tags"
                  :options="option.company"
                  placeholder="Select"
                ></Multiselect>
              </div>
            </div>
          </div>
          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button class="btn btn-lg btn-danger" type="submit">
              <span class="indicator-label">
                Submit
                <KTIcon icon-name="arrow-right" icon-class="fs-2 me-2 me-0" />
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Multiselect from "@vueform/multiselect";
import { hideModal } from "@/core/helpers/dom";

export default defineComponent({
  name: "BukaCabangBaruFiter",
  components: {
    Multiselect,
  },
  props: ["handleFilter", "optCompany"],
  data() {
    return {
      filter: {
        company: [],
      },
      option: {
        company: {
          label: "Select All",
          options: [],
        },
      },
    };
  },
  updated() {
    this.option.company.options = this.optCompany;
  },
  methods: {
    searchItems() {
      this.$props.handleFilter(this.filter);
      hideModal(this.BukaCabangBaruFiterRef);
    },
  },

  setup() {
    const BukaCabangBaruFiterRef = ref<null | HTMLElement>(null);
    return {
      BukaCabangBaruFiterRef,
    };
  },
});
</script>
