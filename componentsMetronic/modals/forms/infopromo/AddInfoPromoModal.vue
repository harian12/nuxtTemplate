<template>
  <div
    class="modal fade"
    id="kt_modal_add_infopromo"
    ref="addInfopromoModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_infopromo_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Kategori Info Promo</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_infopromo_close"
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
              id="kt_modal_add_image_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_image_header"
              data-kt-scroll-wrappers="#kt_modal_add_image_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="fv-row mb-7">
                <label class="required fs-6 fw-semobold mb-2"
                  >Nama Kategori Info Promo</label
                >
                <el-form-item prop="promo_category_name">
                  <el-input
                    v-model="formData.promo_category_name"
                    type="text"
                    onkeyup="this.value = this.value.toUpperCase();"
                    @click="Copy($event.srcElement.value)"
                  />
                </el-form-item>
              </div>
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Status</label>
                <!--end::Label-->

                <!--begin::Input-->
                <div
                  class="form-check form-switch form-check-custom form-check-solid mt-2"
                >
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexSwitchChecked"
                    v-model="formData.status"
                  />
                  <label class="form-check-label" for="flexSwitchChecked">
                    {{ formData.status ? "Active" : "Inactive" }}
                  </label>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              <hr />
              <br />
              <div class="table-responsive">
                <table
                  class="table align-middle table-row-bordered table-hover"
                >
                  <tr class="fw-bold fs-6 text-gray-800">
                    <th>Sub Kategori Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                  <tr v-for="(row, key) in formData.sub_category" :key="key">
                    <td v-if="row.subpromo_category_name != ''">
                      {{ row.subpromo_category_name }}
                    </td>
                    <td v-if="row.subpromo_category_name != ''">
                      {{ row.status }}
                    </td>
                    <td v-if="row.subpromo_category_name != ''">
                      <button
                        type="button"
                        class="btn btn-light"
                        @click="delImage(row.subpromo_category_name)"
                      >
                        <i class="fa fa-trash" style="color: red;"></i>
                      </button>
                    </td>
                  </tr>
                </table>
              </div>
              <br />
              <div class="row">
                <div class="col-8 mb-3">
                  <label class="fs-6 fw-semobold mb-2">Sub Kategori Name</label>
                  <el-form-item prop="nama">
                    <el-input
                      v-model="formData.subpromo_category_name"
                      type="text"
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                </div>

                <div class="col-4 mt-8">
                  <button
                    type="button"
                    class="btn btn-outline btn-outline btn-outline-danger btn-active-light-danger btn-sm"
                    @click="saveTable()"
                  >
                    + Sub Kategori
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              ref="submitButtonRef"
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-danger"
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
import axios from "axios";
import ApiService from "@/core/services/ApiService";
import Multiselect from "@vueform/multiselect";
import Copy from "../../../../helper/coppied";

export default defineComponent({
  name: "add-image-modal",
  components: { Multiselect },
  props: { reload: Function },
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addInfopromoModalRef = ref<null | HTMLElement>(null);
    const submitButtonRef = ref<null | HTMLButtonElement>(null);
    const loading = ref<boolean>(false);
    const formData = ref({
      infopromolId: "",
      status: true,
      code: "",
      sub_category: [
        {
          subinfoId: "",
          subpromo_category_name: "",
          status: "Y",
        },
      ],
      subpromo_category_name: "",
      promo_category_name: "",
      optionsCode: {
        value: "",
        label: "",
      },
    });

    const rules = ref({
      promo_category_name: [
        {
          required: true,
          message: "Nama Kategori Info is required",
          trigger: "change",
        },
      ],
    });

    const resetForm = () => {
      formData.value = {
        ...formData.value,
        infopromolId: "",
        status: true,
        code: "",
        sub_category: [
          {
            subinfoId: "",
            subpromo_category_name: "",
            status: "Y",
          },
        ],
        subpromo_category_name: "",
        promo_category_name: "",
        optionsCode: {
          value: "",
          label: "",
        },
      };
      formRef?.value?.resetFields();
    };

    const saveTable = () => {
      formData.value.sub_category.push({
        subpromo_category_name: formData.value.subpromo_category_name.toUpperCase(),
        status: "Aktif",
        subinfoId: "",
      });
      formData.value.subpromo_category_name = "";
      return;
    };

    const delImage = async (key) => {
      let index = formData.value.sub_category
        .map((x) => {
          return x.subpromo_category_name;
        })
        .indexOf(key);

      if (formData.value.sub_category[index].subinfoId != "") {
        axios.delete("material-image", {
          data: {
            mat_image_id: formData.value.sub_category[index].subinfoId,
          },
        });
      }

      formData.value.sub_category.splice(index, 1);
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

      //Disable button
      submitButtonRef.value.disabled = true;
      loading.value = true;

      formRef.value.validate(async (valid: boolean) => {
        if (valid && formData.value.promo_category_name.length >= 1) {
          let divisiId: any = [];
          formData.value.sub_category.forEach((val) => {
            if (val.subpromo_category_name != "") {
              divisiId.push({
                subpromo_category_name: val.subpromo_category_name.toUpperCase(),
              });
            }
          });

          const saveData = {
            promo_category_name: formData.value.promo_category_name.toUpperCase(),
            sub_category: divisiId,
            status: formData.value.status == true ? "Active" : "Inactive",
          };

          let save = await ApiService.post("promo-category", saveData).then(
            (data) => {
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
                  hideModal(addInfopromoModalRef.value);
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
                submitButtonRef.value.disabled = false;
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
                submitButtonRef.value.disabled = false;
                loading.value = false;
              }
            }
          );
        }
      });
    };

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      addInfopromoModalRef,
      submitButtonRef,
      getAssetPath,
      countries,
      saveTable,
      delImage,
      Multiselect,
      resetForm,
      Copy,
    };
  },
});
</script>
