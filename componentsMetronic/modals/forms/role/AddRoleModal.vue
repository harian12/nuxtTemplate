<template>
  <div
    class="modal fade"
    id="kt_modal_add_role"
    ref="addRoleModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_role_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Role</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_divisi_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary active"
            @click="resetForm"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form
          @submit.prevent="submit()"
          :model="formData"
          :rules="rules"
          ref="formRef"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_add_role_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_role_header"
              data-kt-scroll-wrappers="#kt_modal_add_role_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row">
                <!--begin::Col-->
                <div class="col-md-6 fv-row">
                  <label class="required fs-6 fw-semobold mb-2">Divisi</label>
                  <!--end::Label-->

                  <el-form-item prop="divisi">
                    <Multiselect
                      v-model="formData.divisi"
                      :searchable="true"
                      :options="formData.optionsDivisi"
                      @change="changeRole($event)"
                      placeholder="Select"
                      @click="CopyEvent(formData.divisi)"
                    ></Multiselect>
                  </el-form-item>
                </div>
                <!--end::Col-->
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2">Role</label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item prop="rolename">
                    <el-input
                      v-model="formData.rolename"
                      type="text"
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                  <!--end::Input-->
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2">Company</label>
                  <!--end::Label-->

                  <el-form-item prop="company">
                    <Multiselect
                      v-model="formData.company"
                      mode="tags"
                      :searchable="true"
                      :close-on-select="false"
                      :groups="true"
                      :options="formData.optionsCompany"
                      placeholder="Select"
                      @click="Copy($event.srcElement.innerText)"
                    ></Multiselect>
                  </el-form-item>
                </div>
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >Bisnis Unit</label
                  >
                  <!--end::Label-->

                  <el-form-item prop="bisnis">
                    <Multiselect
                      v-model="formData.bisnis"
                      mode="tags"
                      :searchable="true"
                      :close-on-select="false"
                      :groups="true"
                      :options="formData.optionsBisnis"
                      placeholder="Select"
                      @click="Copy($event.srcElement.innerText)"
                    ></Multiselect>
                  </el-form-item>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">Material Type</label>
                  <!--end::Label-->

                  <el-form-item prop="material">
                    <Multiselect
                      v-model="formData.material"
                      mode="tags"
                      :searchable="true"
                      :close-on-select="false"
                      :groups="true"
                      :options="formData.optionsMaterial"
                      placeholder="Select"
                      @click="Copy($event.srcElement.innerText)"
                    ></Multiselect>
                  </el-form-item>
                </div>
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="fs-6 fw-semobold mb-2">Cabang</label>
                  <!--end::Label-->

                  <el-form-item prop="cabang">
                    <Multiselect
                      v-model="formData.cabang"
                      mode="tags"
                      :searchable="true"
                      :close-on-select="false"
                      :groups="true"
                      :options="formData.optionsCabang"
                      placeholder="Select"
                      @click="Copy($event.srcElement.innerText)"
                    ></Multiselect>
                  </el-form-item>
                </div>
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
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
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onMounted } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Multiselect from "@vueform/multiselect";
import ApiService from "@/core/services/ApiService";
import Copy from "../../../../helper/coppied";

export default defineComponent({
  name: "add-role-modal",
  components: { Multiselect },
  props: { reload: Function },
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addRoleModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = ref({
      divisi: "",
      company: [],
      bisnis: [],
      material: [],
      cabang: [],
      rolename: "",
      optionsDivisi: [],
      optionsCompany: [],
      optionsBisnis: [],
      optionsMaterial: [],
      optionsCabang: [],
    });

    const divisiAll = ref([]);

    const rules = ref({
      divisi: [
        {
          required: true,
          message: "Divisi is required",
          trigger: "change",
        },
      ],
      company: [
        {
          required: true,
          message: "Company is required",
          trigger: "change",
        },
      ],
      bisnis: [
        {
          required: true,
          message: "Bisnis is required",
          trigger: "change",
        },
      ],
      rolename: [
        {
          required: true,
          message: "Role is required",
          trigger: "change",
        },
      ],
    });

    onMounted(() => {
      getList();
    });

    const resetForm = () => {
      formData.value = {
        ...formData.value,
        divisi: "",
        company: [],
        bisnis: [],
        material: [],
        cabang: [],
        rolename: "",
      };
      formRef?.value?.resetFields();
    };

    const getList = async () => {
      let materialList: any = [];
      let cabanglList: any = [];
      let divisiList: any = [];

      await ApiService.get("material-type")
        .then((data) => {
          data.data.data.forEach((val) => {
            materialList.push({
              value: val.mattype_id,
              label: val.mattype_code + "-" + val.mattype_name,
            });
          });
        })
        .catch((e) => {
          console.error(e);
        });

      await ApiService.get("cabang")
        .then((data) => {
          data.data.data.forEach((val) => {
            cabanglList.push({
              value: val.cabang_id,
              label: val.plant.plant_code + "-" + val.plant.plant_name,
            });
          });
        })
        .catch((e) => {
          console.error(e);
        });

      await ApiService.get("divisi")
        .then((data) => {
          data.data.data.forEach((val) => {
            divisiList.push({
              value: val.divisi_id,
              label: val.divisi_name,
            });
          });
          divisiAll.value = data.data.data;
        })
        .catch((e) => {
          console.error(e);
        });

      let mapPushMaterial: any = [
        {
          label: "Select All",
          options: materialList,
        },
      ];

      let mapPushCabang: any = [
        {
          label: "Select All",
          options: cabanglList,
        },
      ];

      formData.value.optionsDivisi = divisiList;
      formData.value.optionsMaterial = mapPushMaterial;
      formData.value.optionsCabang = mapPushCabang;
    };
    const submit = () => {
      if (navigator.onLine) {
        console.log("online");
      } else {
        console.log("offline");
        Swal.fire({
          icon: "info",
          html: "System Offline",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        loading.value = false;
        return;
      }
      if (!formRef.value) {
        return;
      }

      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          let companyId: any = [];
          formData.value.company.forEach((val: any) => {
            companyId.push({
              company_id: val,
            });
          });

          let bisnisList: any = [];
          formData.value.bisnis.forEach((val: any) => {
            bisnisList.push({
              bisnis_unit_id: val,
            });
          });

          let mattypeId: any = [];
          formData.value.material.forEach((val: any) => {
            mattypeId.push({
              mattype_id: val,
            });
          });

          let cabangId: any = [];
          formData.value.cabang.forEach((val: any) => {
            cabangId.push({
              cabang_id: val,
            });
          });

          const saveData = {
            role_name: formData.value.rolename.toUpperCase(),
            role_company: companyId,
            role_bisnis_unit: bisnisList,
            divisi_id: formData.value.divisi,
            role_material_type: mattypeId,
            role_cabang: cabangId,
          };

          await ApiService.post("role", saveData)
            .then((data) => {
              if (data.data.status_code == 200) {
                loading.value = false;
                Swal.fire({
                  text: "Form has been successfully submitted!",
                  icon: "success",
                  buttonsStyling: false,
                  confirmButtonText: "Ok, got it!",
                  heightAuto: false,
                  customClass: {
                    confirmButton: "btn btn-primary",
                  },
                }).then(() => {
                  hideModal(addRoleModalRef.value);
                  emit("reload");
                });
              } else if (data.data.status_code == 400) {
                let msg = "";
                data.data.errors.forEach((val) => {
                  msg += `<li style='text-aling:left'>${val.msg}</li>`;
                });
                Swal.fire({
                  icon: "error",
                  html: msg,
                  buttonsStyling: false,
                  confirmButtonText: "Ok, got it!",
                  heightAuto: false,
                  customClass: {
                    confirmButton: "btn btn-primary",
                  },
                });
                loading.value = false;
              } else {
                Swal.fire({
                  text: data.data.msg,
                  icon: "error",
                  buttonsStyling: false,
                  confirmButtonText: "Ok, got it!",
                  heightAuto: false,
                  customClass: {
                    confirmButton: "btn btn-primary",
                  },
                });
                loading.value = false;
              }
            })
            .catch((errors) => {
              console.log(errors);
            });
        }
      });
    };

    const changeRole = async (id) => {
      let bisnis: any = [];
      let company: any = [];
      divisiAll.value.forEach((val: any) => {
        if (val.divisi_id == id) {
          val.divisi_bisnis_unit.forEach((val1: any) => {
            bisnis.push({
              value: val1.bisnis_unit.bisnis_unit_id,
              label:
                val1.bisnis_unit.bisnis_unit_code +
                "-" +
                val1.bisnis_unit.bisnis_unit,
            });
          });
          if (val.divisi_company.length > 0) {
            val.divisi_company.forEach((val2: any) => {
              company.push({
                value: val2.company.company_id,
                label:
                  val2.company.company_code + "-" + val2.company.company_name,
              });
            });
            ``;
          }
        }
        return;
      });

      let mapPushBisnis: any = [
        {
          label: "Select All",
          options: bisnis,
        },
      ];

      let mapPushCompany: any = [
        {
          label: "Select All",
          options: company,
        },
      ];

      formData.value.optionsBisnis = mapPushBisnis;
      formData.value.optionsCompany = mapPushCompany;
    };

    const CopyEvent = (id) => {
      formData.value.optionsDivisi.forEach((val: any) => {
        if (id == val.value) {
          Copy(val.label);
        }
      });
    };

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      addRoleModalRef,
      getAssetPath,
      countries,
      Multiselect,
      changeRole,
      Copy,
      CopyEvent,
      resetForm,
    };
  },
});
</script>
