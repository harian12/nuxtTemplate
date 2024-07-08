<template>
  <div
    class="modal fade"
    tabindex="-1"
    id="kt_AddBukaCabang"
    ref="AddBukaCabangRef"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Add Buka Cabang</h3>
          <div
            class="btn btn-icon btn-sm btn-active-icon-primary active"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="formRef?.resetFields()"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
        </div>
        <el-form
          @submit.prevent="searchItems()"
          :model="form"
          :rules="rules"
          ref="formRef"
        >
          <div class="modal-body py-10 px-lg-17">
            <div class="row">
              <div class="col-12 fv-row">
                <label class="required fs-6 fw-semobold mb-2">
                  Plant Name
                </label>

                <el-form-item prop="plant_name">
                  <Multiselect
                    v-model="form.plant_name"
                    :searchable="true"
                    :options="option.plant"
                    placeholder="Select"
                    @change="handleChange($event)"
                  ></Multiselect>
                </el-form-item>
              </div>
              <div class="col-12 fv-row">
                <label class="required fs-6 fw-semobold mb-2">
                  Bisnis Unit
                </label>
                <el-form-item prop="bisnis_unit_id">
                  <Multiselect
                    v-model="form.bisnis_unit_id"
                    :searchable="true"
                    :options="option.bunit"
                    placeholder="Select"
                  ></Multiselect>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-danger"
              type="submit"
            >
              <span v-if="!loading" class="indicator-label">
                Submit
                <KTIcon icon-name="arrow-right" icon-class="fs-2 me-2 me-0" />
              </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Multiselect from "@vueform/multiselect";
import {
  bukaCabangList,
  addBukaCabangInput,
  inputModal,
} from "@/stores/bukaCabangBaru";
import type { FormInstance } from "element-plus";
import ApiService from "@/core/services/ApiService";
import type { IBukaCabangBaru } from "@/core/data/bukaCabangBaru";
import { hideModal } from "@/core/helpers/dom";

export default defineComponent({
  name: "AddBukaCabang",
  components: {
    Multiselect,
  },
  data() {
    return {
      loading: false,
      form: {
        plant_name: "",
        bisnis_unit_id: "",
      },
      option: {
        bunit: [],
        plant: [],
      },
      rules: {
        plant_name: {
          required: true,
          message: "Plant Name is required",
          trigger: "change",
        },
        bisnis_unit_id: {
          required: true,
          message: "Bisnis Unit is required",
          trigger: "change",
        },
      },
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try {
        const { data } = await ApiService.get("cabang");
        const res: {
          label: string;
          value: number;
          cabang_bisnis_unit: any;
          plant_name: string;
        }[] = [];
        data.data.forEach((element) => {
          const { plant_code, plant_name } = element.plant;
          res.push({
            label: `${plant_code} - ${plant_name}`,
            value: element.id,
            cabang_bisnis_unit: element.cabang_bisnis_unit,
            plant_name,
          });
        });
        this.option.plant = res as any;
      } catch (error) {
        console.log(error);
      }
    },
    handleChange(val) {
      if (!val) {
        this.option.bunit = [];
        return;
      }
      const res = this.option.plant.find((item: any) => item.value === val);

      const { cabang_bisnis_unit }: any = res;
      this.option.bunit = cabang_bisnis_unit.map((item) => ({
        label: item.bisnis_unit.bisnis_unit,
        value: item.cabang_bisnis_unit_id,
        bisnis_unit_id: item.bisnis_unit.bisnis_unit_id,
      }));
    },
    searchItems() {
      if (!this.formRef) {
        return;
      }
      this.formRef.validate(async (valid: boolean) => {
        if (valid) {
          const params: string[] = [`f_buka=${true}`];
          let url = `cabang/bisnis-unit`;

          if (params[0]) {
            url += `?${params.join("&")}`;
          }

          await ApiService.put("cabang/bisnis-unit/f-buka", {
            cabang_bisnis_unit_id: this.form.bisnis_unit_id,
          });
          const { data } = await ApiService.get(url);

          const res: IBukaCabangBaru[] = [];

          data.data.forEach((element) => {
            res.push({
              company_code: element.cabang?.company?.company_code,
              plant_code: element.cabang?.plant.plant_code,
              plant_name: element.cabang?.plant.plant_name,
              bisnis_unit: element.bisnis_unit.bisnis_unit,
              cabang_bisnis_unit_id: element.cabang_bisnis_unit_id,
              kdcaboptik: element.cabang?.kdcaboptik,
              kota: element.cabang?.kota?.kota ?? "-",
              propinsi: element.cabang?.propinsi.prop_name,
              buka: element.cabang?.buka,
              tutup: element.cabang?.tutup,
              modal_awal: element.modal_awal,
              company_id: element.cabang?.company?.company_id,
              cabang_no_pelanggan: element.cabang_no_pelanggan,
            });
          });

          addBukaCabangInput.setData({
            cabang_bisnis_unit_id: this.form.bisnis_unit_id,
          });
          bukaCabangList.setData(res);
          hideModal(this.AddBukaCabangRef);
        }
      });
    },
  },
  setup() {
    const AddBukaCabangRef = ref<HTMLDivElement | null>(null);
    const formRef = ref<FormInstance>();
    return {
      AddBukaCabangRef,
      formRef,
    };
  },
});
</script>
