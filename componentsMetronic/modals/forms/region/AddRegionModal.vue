<template>
  <div
    class="modal fade"
    id="kt_modal_add_region"
    ref="addRegionModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_region_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Region</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_region_close"
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
              id="kt_modal_add_region_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_region_header"
              data-kt-scroll-wrappers="#kt_modal_add_region_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Nama Kota</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="value">
                  <Multiselect
                    v-model="formData.value"
                    v-bind="example1"
                    :searchable="true"
                    placeholder="Select"
                  ></Multiselect>
                </el-form-item>

                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-15">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2"
                  >Nama Region</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="nama">
                  <el-input
                    v-model="formData.nama"
                    type="text"
                    onkeyup="this.value = this.value.toUpperCase();"
                  />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-danger"
              type="submit"
            >
              <span v-if="!loading" class="indicator-label">
                Submit
                <KTIcon icon-name="arrow-right" icon-class="fs-5 me-2 me-0" />
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

export default defineComponent({
  name: "add-company-modal",
  components: { Multiselect },
  porps: { reload: Function },
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addRegionModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = ref({
      kode: "",
      nama: "",
      value: null,
    });
    const example1 = ref({
      options: {},
    });

    const rules = ref({
      value: [
        {
          required: true,
          message: "Nama Kota is required",
          trigger: "change",
        },
      ],
      nama: [
        {
          required: true,
          message: "Nama Region is required",
          trigger: "change",
        },
      ],
    });

    onMounted(async () => {
      let kota = await ApiService.get("kota");

      let kotaList: any = [];
      kota.data.data.forEach((val) => {
        kotaList.push({
          value: val.kota_id,
          label: val.kota,
        });
      });
      example1.value.options = kotaList;
    });

    const resetForm = () => {
      formData.value = {
        nama: "",
        kode: "",
      };
      example1.value = {
        ...example1.value,
        value: null,
      };
      formRef?.value?.resetFields();
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

          const saveData = {
            region: formData.value.nama.toUpperCase(),
            kota: formData.value.value,
          };
          let save = await ApiService.post("region", saveData).then((data) => {
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
                hideModal(addRegionModalRef.value);
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
            }
          });
        }
      });
    };

    return {
      formData,
      example1,
      rules,
      submit,
      formRef,
      loading,
      addRegionModalRef,
      getAssetPath,
      countries,
      Multiselect,
      resetForm,
    };
  },
});
</script>
