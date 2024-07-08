<template>
  <div
    class="modal fade"
    id="kt_modal_add_image"
    ref="addImageModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_image_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Material Image</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_image_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary active"
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
                  >Material Code</label
                >
                <el-form-item prop="nama">
                  <Multiselect
                    v-model="formData.materialId"
                    :searchable="true"
                    :options="formData.optionsCode"
                    placeholder="Select"
                    @select="
                      (id, _) => {
                        formData.materialId = id;
                      }
                    "
                    @click="
                      () => {
                        formData.optionsCode.forEach((val) => {
                          if (formData.materialId == val.value) {
                            Copy(val.label);
                          }
                        });
                      }
                    "
                  ></Multiselect>
                </el-form-item>
              </div>
              <label for="">Termin</label>
              <div class="table-responsive">
                <table class="table table-bordered">
                  <tr>
                    <th>In Number</th>
                    <th>Image URL</th>
                    <th></th>
                  </tr>
                  <tr v-for="(row, key) in formData.file" :key="key">
                    <td v-if="row.inNumber != ''">{{ row.inNumber }}</td>
                    <td v-if="row.inNumber != ''">{{ row.image }}</td>
                    <td v-if="row.inNumber != ''">
                      <button
                        type="button"
                        class="btn btn-light"
                        @click="delImage(row.inNumber)"
                      >
                        <i class="fa fa-close" style="color: red"></i>
                      </button>
                    </td>
                  </tr>
                </table>
              </div>
              <div class="row">
                <div class="col-5">
                  <label class="required fs-6 fw-semobold mb-2"
                    >In Number</label
                  >
                  <el-form-item prop="nama">
                    <el-input
                      v-model="formData.inNumber"
                      type="number"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                </div>
                <div
                  class="col-1"
                  style="padding: 0px !important; padding-left: 20px"
                >
                  <svg
                    width="30"
                    height="80"
                    viewBox="0 0 32 59"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 20.375V35.5C18 36.625 17.0625 37.5 16 37.5C14.875 37.5 14 36.625 14 35.5V20.375L9.375 24.9375C8.625 25.75 7.3125 25.75 6.5625 24.9375C5.75 24.1875 5.75 22.875 6.5625 22.125L14.5625 14.125C15.3125 13.3125 16.625 13.3125 17.375 14.125L25.375 22.125C26.1875 22.875 26.1875 24.1875 25.375 24.9375C24.625 25.75 23.3125 25.75 22.5625 24.9375L18 20.375ZM4 35.5H12C12 37.75 13.75 39.5 16 39.5C18.1875 39.5 20 37.75 20 35.5H28C30.1875 35.5 32 37.3125 32 39.5V41.5C32 43.75 30.1875 45.5 28 45.5H4C1.75 45.5 0 43.75 0 41.5V39.5C0 37.3125 1.75 35.5 4 35.5ZM27 42C27.8125 42 28.5 41.375 28.5 40.5C28.5 39.6875 27.8125 39 27 39C26.125 39 25.5 39.6875 25.5 40.5C25.5 41.375 26.125 42 27 42Z"
                      fill="#3167E3"
                    />
                  </svg>
                </div>
                <div class="col-4" style="padding: 0px !important">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Upload Image</label
                  >
                  <el-form-item prop="file">
                    <div class="input-group custom-file-button">
                      <input
                        type="file"
                        class="form-control form-select-sm"
                        accept="image/*"
                        @change="saveImage($event)"
                        id="inputGroupFile"
                      />
                    </div>
                  </el-form-item>
                </div>
                <div class="col-2 mt-8">
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="saveTable()"
                  >
                    Upload
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
  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const addImageModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = ref({
      materialId: "",
      code: "",
      file: [
        {
          matId: "",
          inNumber: "",
          image: "",
          file: {},
        },
      ],
      inNumber: "",
      image: {
        name: "",
      },
      optionsCode: [{ value: "", label: "" }],
    });

    const rules = ref({
      material_kode: [
        {
          required: true,
          message: "Image name is required",
          trigger: "change",
        },
      ],
    });

    onMounted(async () => {
      let materialList: any = [];
      await ApiService.get("material").then((data) => {
        data.data.data.forEach((val) => {
          materialList.push({
            value: val.material_id,
            label: val.material_code,
          });
        });
      });
      formData.value.optionsCode = materialList;
    });
    const saveImage = (event) => {
      formData.value.image = event.target.files[0];
    };

    const saveTable = () => {
      const cekNumber = formData.value.file.some(
        ({ inNumber }) => inNumber == formData.value.inNumber
      );

      if (cekNumber) {
        return;
      }

      formData.value.file.push({
        inNumber: formData.value.inNumber,
        image: formData.value.image.name,
        file: formData.value.image,
        matId: "",
      });
    };

    const delImage = async (key) => {
      let index = formData.value.file
        .map((x) => {
          return x.inNumber;
        })
        .indexOf(key);

      if (formData.value.file[index].matId != "") {
        axios.delete("material-image", {
          data: {
            mat_image_id: formData.value.file[index].matId,
          },
        });
      }

      formData.value.file.splice(index, 1);
    };

    const submit = async () => {
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

      if (formData.value.file.length == 1) {
        Swal.fire({
          text: "Image material tidak boleh kosong",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
        return false;
      }

      let file = new FormData();
      formData.value.file.forEach((val: any) => {
        if (val.inNumber != "" && val.matId == "") {
          file.append("file", val.file);
          file.append("in_number", val.inNumber);
        }
      });

      file.append("material_id", formData.value.materialId);
      ApiService.post("material-image", file).then((data) => {
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
            hideModal(addImageModalRef.value);
            location.reload();
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
          return false;
        }
      });
    };

    return {
      formData,
      rules,
      submit,
      formRef,
      loading,
      addImageModalRef,
      getAssetPath,
      countries,
      saveImage,
      saveTable,
      delImage,
      Multiselect,
      Copy,
    };
  },
});
</script>
