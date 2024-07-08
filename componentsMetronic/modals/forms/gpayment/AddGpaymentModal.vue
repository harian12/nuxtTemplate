<template>
  <div
    class="modal fade"
    id="kt_modal_add_gpayment"
    ref="addFormModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_gpayment_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add Group Payment</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_gpayment_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary active"
            @click="
              () => {
                resetForm();
              }
            "
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
              id="kt_modal_add_gpayment_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_gpayment_header"
              data-kt-scroll-wrappers="#kt_modal_add_gpayment_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row">
                <div class="col-md-4 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Kode Group Payment</label
                  >
                  <el-form-item prop="group_payment_code">
                    <el-input
                      v-model="formData.group_payment_code"
                      type="text"
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                </div>
                <div class="col-md-4 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Nama Group Payment</label
                  >
                  <el-form-item prop="group_payment_name">
                    <el-input
                      v-model="formData.group_payment_name"
                      type="text"
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                </div>
                <div class="col-md-4 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Payment Code</label
                  >
                  <el-form-item prop="payment_code">
                    <el-input
                      v-model="formData.payment_code"
                      type="text"
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                  </el-form-item>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 fv-row">
                  <label class="required fs-6 fw-semobold mb-2">Ranking</label>
                  <el-form-item prop="ranking">
                    <el-input
                      v-model="formData.ranking"
                      type="text"
                      onkeyup="this.value = this.value.toUpperCase();"
                      @click="Copy($event.srcElement.value)"
                    />
                    <span class="errMessageCustom">{{
                      errMessage["ranking"]
                    }}</span>
                  </el-form-item>
                </div>
                <div class="col-md-6 fv-row">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semobold mb-2"
                    >Use In POS</label
                  >
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
                      v-model="formData.use_in_pos"
                    />
                    <label class="form-check-label" for="flexSwitchChecked">
                      {{ formData.use_in_pos ? "YES" : "NO" }}
                    </label>
                  </div>
                  <!--end::Input-->
                </div>
              </div>
              <hr />

              <div class="table-responsive">
                <table class="table table-bordered">
                  <tr class="fw-bold fs-6 text-gray-800">
                    <th>Image URL</th>
                    <th>Action</th>
                  </tr>
                  <tr v-for="(row, key) in formData.file" :key="key">
                    <td v-if="row.image != ''">{{ row.image }}</td>
                    <td v-if="row.image != ''">
                      <button
                        type="button"
                        class="btn btn-light"
                        style="background-color: transparent"
                        @click="delImage(row.image)"
                      >
                        <i class="fa fa-close" style="color: red"></i>
                      </button>
                    </td>
                  </tr>
                </table>
              </div>
              <div class="row">
                <div class="col-8" style="padding-left: 13px !important">
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
                        v-if="inputFile"
                      />
                    </div>
                    <span class="errMessageCustom">{{
                      errMessage["image"]
                    }}</span>
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
import { defineComponent, ref, onMounted, nextTick } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from "axios";
import ApiService from "@/core/services/ApiService";
import Multiselect from "@vueform/multiselect";
import Copy from "../../../../helper/coppied";

export default defineComponent({
  name: "add-gpayment-modal",
  components: {},
  props: { reload: Function },
  setup(_, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addFormModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = ref({
      group_payment_id: "",
      group_payment_code: "",
      group_payment_name: "",
      ranking: "",
      payment_code: "",
      use_in_pos: true,
      status: "Active",
      group_payment_image: "",
      materialId: "",
      code: "",
      file: [
        {
          matId: "",
          image: "",
          file: {},
        },
      ],
      image: {
        name: "",
      },
      optionsCode: {
        value: "",
        label: "",
      },
    });

    const rules = ref({
      group_payment_code: [
        {
          required: true,
          message: "Payment Group Code is required",
          trigger: "change",
        },
      ],
      group_payment_name: [
        {
          required: true,
          message: "Payment Name is required",
          trigger: "change",
        },
      ],
      ranking: [
        {
          required: true,
          message: "Rank is required",
          trigger: "change",
        },
      ],
      payment_code: [
        {
          required: true,
          message: "Payment Code is required",
          trigger: "change",
        },
      ],
      use_in_pos: [
        {
          required: true,
          message: "Use in POS is required",
          trigger: "change",
        },
      ],
      status: [
        {
          required: true,
          message: "Status is required",
          trigger: "change",
        },
      ],
      file: [
        {
          required: true,
          message: "File is required",
          trigger: "change",
        },
      ],
    });

    const saveImage = (event) => {
      formData.value.image = event.target.files[0];
    };

    const inputFile = ref(true);
    const errMessage = ref<any>([]);
    const saveTable = async () => {
      if (formData.value.image.name) {
        formData.value.file.push({
          image: formData.value.image.name,
          file: formData.value.image,
          matId: "",
        });

        // Reset field by rerender field
        formData.value.image = null;
        inputFile.value = false;
        await nextTick();
        inputFile.value = true;
      } else {
        errMessage.value["image"] = "Upload image is required";
      }
    };

    const delImage = async (key) => {
      let index = formData.value.file
        .map((x) => {
          return x.image;
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

    const resetForm = async () => {
      errMessage.value = [];
      formRef?.value?.resetFields();
      // Reset field by rerender field
      formData.value.image = null;
      inputFile.value = false;
      await nextTick();
      inputFile.value = true;
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

      errMessage.value = [];
      if (formData.value.file.length <= 1) {
        formData.value.file.forEach((val: any, key) => {
          if (val.image == "" && key > 0) {
            errMessage.value["image"] = "Upload image is required";
          }
        });
      }

      if (formData.value.file.length == 1) {
        errMessage.value["image"] = "Upload image is required";
      }

      if (!formRef.value) {
        return;
      }

      formRef.value.validate(async (valid: boolean) => {
        if (valid && formData.value.file) {
          loading.value = true;

          let file = new FormData();
          formData.value.file.forEach((val: any) => {
            if (val.matId == "") {
              file.append("file", val.file);
            }
          });

          file.append(
            "group_payment_code",
            formData.value.group_payment_code.toUpperCase()
          );
          file.append(
            "group_payment_name",
            formData.value.group_payment_name.toUpperCase()
          );
          file.append("ranking", formData.value.ranking);
          file.append(
            "payment_code",
            formData.value.payment_code.toUpperCase()
          );
          file.append("use_in_pos", formData.value.use_in_pos ? "YES" : "NO");
          file.append("status", formData.value.status);

          await ApiService.post("group-payment", file).then((data) => {
            loading.value = false;
            if (data.data.status_code == 200) {
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
                hideModal(addFormModalRef.value);
                emit("reload");
              });
            } else if (data.data.status_code == 400) {
              data.data.errors.forEach((val) => {
                errMessage.value[val.path] = val.msg;
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
      rules,
      submit,
      formRef,
      loading,
      addFormModalRef,
      getAssetPath,
      countries,
      saveImage,
      saveTable,
      delImage,
      Multiselect,
      resetForm,
      Copy,
      errMessage,
      inputFile,
    };
  },
});
</script>
