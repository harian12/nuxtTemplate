<template>
  <div
    class="modal fade"
    id="kt_modal_JenisFintechModal"
    ref="formModal"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_JenisFintechModal_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">{{ title }}</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_merchant_close"
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
          @submit.prevent="submitForm()"
          :model="formData"
          :rules="rules"
          ref="formRef"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_add_merchant_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_JenisFintechModal_header"
              data-kt-scroll-wrappers="#kt_modal_JenisFintechModal_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row">
                <div class="col-12 mb-2 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Jenis Fintech</label
                  >
                  <el-form-item prop="jenis_fintech">
                    <el-input
                      v-model="formData.jenis_fintech"
                      type="text"
                      ref="jenis_fintech"
                      @click="Copy($event.srcElement.value)"
                      :class="{
                        'is-disabled': view,
                      }"
                      @keydown.enter.prevent="
                        () => {
                          inputGroupFile.focus();
                        }
                      "
                    />
                  </el-form-item>
                </div>
                <div class="col-12">
                  <div class="table-responsive" v-if="!view">
                    <table class="table table-bordered">
                      <tr class="fw-bold fs-6 text-gray-800">
                        <th>Image URL</th>
                        <th>Action</th>
                      </tr>
                      <tr v-for="(row, key) in mapData" :key="key">
                        <td>{{ row.image }}</td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-light"
                            style="background-color: transparent;"
                            @click="delImage(row.image)"
                          >
                            <i class="fa fa-close" style="color: red;"></i>
                          </button>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="row">
                    <div
                      class="col-8"
                      style="padding-left: 13px !important;"
                      v-if="!view"
                    >
                      <label class="required fs-6 fw-semobold mb-2"
                        >Upload Image</label
                      >
                      <el-form-item prop="file">
                        <div class="input-group custom-file-button">
                          <input
                            type="file"
                            class="form-control form-select-sm"
                            accept="image/*"
                            id="inputGroupFile"
                            ref="inputGroupFile"
                            @change="onHandelImage($event)"
                            :disabled="view"
                            v-if="inputFile"
                          />
                        </div>
                        <span v-if="formData.errImage" class="errMessageCustom"
                          >Upload image is required</span
                        >
                      </el-form-item>
                    </div>
                    <div class="col-2 mt-8" v-if="!view">
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="saveTable()"
                      >
                        Upload
                      </button>
                    </div>
                    <div class="col-md-9 fv-row" v-if="view">
                      <label class="required fs-6 fw-semobold mb-2">File</label>
                      <el-form-item>
                        <el-input
                          v-model="formData.images"
                          type="text"
                          placeholder=""
                          disabled
                        />
                      </el-form-item>
                    </div>

                    <div class="col-2 mt-10" v-if="view">
                      <a @click="displayImage(formData.images)" target="_blank">
                        <i
                          class="fa fa-eye"
                          :style="{
                            color:
                              formData.images == detailImage.name
                                ? '#af272f'
                                : '',
                          }"
                        ></i>
                      </a>
                    </div>
                  </div>
                  <br />
                  <div
                    class="card bg-light shadow-sm"
                    v-if="detailImage.showImage"
                  >
                    <div class="card-header">
                      <h3 class="card-title">{{ detailImage.name }}</h3>
                      <div class="card-toolbar">
                        <a
                          @click="closeImage()"
                          class="btn btn-icon btn-sm btn-active-icon-primary active"
                          data-bs-toggle="tooltip"
                          title="Close Image"
                          data-bs-dismiss="click"
                        >
                          <i class="ki-duotone ki-cross fs-1"
                            ><span class="path1"></span
                            ><span class="path2"></span
                          ></i>
                        </a>
                      </div>
                    </div>

                    <div class="card-body card-scroll h-350px">
                      <img
                        :src="'http://' + detailImage.url"
                        class="w-500px me-3"
                        alt="image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center" v-if="!view">
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

<style>
.el-input__inner {
  text-transform: uppercase;
}
label[for="inputGroupFile"] {
  width: 100%;
  border: 1px dashed;
  border-radius: 2px;
  display: flex;
}
label > svg,
label > img {
  margin: 10px auto;
}
</style>

<script lang="ts">
import { defineComponent, ref, nextTick } from "vue";

import Copy from "../../../../helper/coppied";
import ApiService from "@/core/services/ApiService";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2";

export default defineComponent({
  name: "add-jenisfintech-modal",
  props: ["title", "detail", "view", "reload"],
  data() {
    return {
      inputFile: true,
      loading: false,
      preview: "",
      detailImage: {
        showImage: false,
        name: "",
        url: "",
      },
      formData: {
        jenis_fintech: "",
        file: <any>[],
        image: {
          name: "",
        },
        images: "",
        errImage: false,
      },
      rules: {
        jenis_fintech: [
          {
            required: true,
            message: "Jenis Fintech is required",
            trigger: "change",
          },
        ],
      },
    };
  },
  updated() {
    this.detailImage.showImage = false;
    this.detailImage.name = "";
    const { detail } = this.$props;
    if (detail.jenis_fintech) {
      this.formData.jenis_fintech = detail.jenis_fintech;

      this.formData.images = detail.image;
    } else {
      //this.formData.jenis_fintech = "";
      // Reset field by rerender field
      this.formData.errImage = false;
      this.formRef?.resetFields();
    }
  },
  methods: {
    async resetForm() {
      this.mapData = null;
      this.inputFile = false;
      await nextTick();
      this.inputFile = true;
      this.formData.errImage = false;
      this.formRef?.resetFields();
    },
    submitForm() {
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
        this.loading = false;
        return;
      }

      if (!this.formRef) {
        return;
      }
      this.formRef.validate(async (valid: boolean) => {
        if (this.mapData.length == 0) {
          this.formData.errImage = true;
          return;
        }
        if (valid) {
          this.loading = true;
          this.formData.jenis_fintech = this.formData.jenis_fintech.toUpperCase();
          const frmData = new FormData();
          frmData.append("jenis_fintech", this.formData.jenis_fintech);

          if (this.formData.file) {
            frmData.append("file", this.mapData.file);
          }
          if (this.detail.jenis_fintech_id) {
            frmData.append("jenis_fintech_id", this.detail.jenis_fintech_id);
            this.updateForm(frmData);
          } else {
            this.createForm(frmData);
          }
        }
      });
    },
    async createForm(form) {
      try {
        await ApiService.post("jenis-fintech", form);
        this.loading = false;
        hideModal(this.formModal);
        Swal.fire({
          text: "Form has been successfully submitted!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        }).then(() => {
          this.$emit("reload");
        });
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    async updateForm(form) {
      try {
        await ApiService.put("jenis-fintech", form);
        this.loading = false;
        hideModal(this.formModal);
        Swal.fire({
          text: "Form has been successfully submitted!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn btn-primary",
          },
        }).then(() => {
          this.$emit("reload");
        });
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    /**
     * @description Handle upload file
     * @param {event} e
     */
    onHandelImage(e) {
      if (e.target.files[0]) {
        this.formData.errImage = false;
        this.formData.image = e.target.files[0];
      } else {
        this.formData.file = <any>[];
      }
    },

    async saveTable() {
      if (this.mapData.length > 0) {
        this.mapData = <any>[];
      }
      if (this.formData.image.name) {
        this.mapData.push({
          image: this.formData.image.name,
          file: this.formData.image,
          matId: "",
        });
        this.inputFile = false;
        await nextTick();
        this.inputFile = true;
      } else {
        Swal.fire({
          text: "Please input image",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn btn-primary",
          },
        });
      }
    },

    delImage(key) {
      let index = this.mapData
        .map((x) => {
          return x.image;
        })
        .indexOf(key);

      this.mapData.splice(index, 1);
    },
    displayImage(name) {
      this.detailImage.showImage = true;
      if (name) {
        this.detailImage.name = name;
        this.detailImage.url = name;
      }
    },
    closeImage() {
      this.detailImage.showImage = false;
      this.detailImage.name = "";
    },
  },
  setup() {
    const formModal = ref<HTMLDivElement | null>(null);
    const inputGroupFile = ref();
    const formRef = ref<HTMLFormElement | null>(null);
    const mapData = ref<any>([]);
    const preview = ref("");
    return {
      Copy,
      inputGroupFile,
      formRef,
      formModal,
      mapData,
      preview,
    };
  },
});
</script>
