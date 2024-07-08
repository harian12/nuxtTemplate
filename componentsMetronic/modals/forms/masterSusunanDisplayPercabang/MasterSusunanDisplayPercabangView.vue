<template>
  <div
    class="modal fade"
    id="kt_modal_MasterSusunanDisplayPercabangView"
    ref="modalViewRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div
          class="modal-header"
          id="kt_modal_MasterSusunanDisplayPercabangView_header"
        >
          <!--begin::Modal title-->
          <h2 class="fw-bold">View Setting Susunan Display</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_MasterSusunanDisplayPercabangView_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary active"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-6 fv-row">
              <label class="required fs-6 fw-semobold mb-2">Kode Cabang</label>
              <el-form-item>
                <el-input
                  v-model="data.bisnis_unit_code"
                  type="text"
                  class="is-disabled"
                  readonly
                  @click="Copy($event.srcElement.value)"
                />
              </el-form-item>
            </div>
            <div class="col-6 fv-row">
              <label class="required fs-6 fw-semobold mb-2">Bisnis Unit</label>
              <el-form-item>
                <el-input
                  v-model="data.bisnis_unit"
                  type="text"
                  class="is-disabled"
                  readonly
                  @click="Copy($event.srcElement.value)"
                />
              </el-form-item>
            </div>
            <div class="col-12">
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr class="fw-bold fs-6 text-gray-800">
                      <th>Image URL</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="!data.display_denah">
                      <td colspan="2" class="fw-bold text-center">
                        Tidak ada Data
                      </td>
                    </tr>
                    <tr v-else>
                      <td>{{ data.display_denah }}</td>
                      <td>
                        <a
                          @click="displayImage(data.display_denah)"
                          :style="{
                            backgroundColor:
                              data.display_denah == detailImage.name
                                ? '#fbe1d4'
                                : '',
                          }"
                        >
                          <i class="fa fa-eye"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card bg-light shadow-sm" v-if="detailImage.showImage">
                <div class="card-header">
                  <h3 class="card-title">{{ detailImage.name }}</h3>
                </div>
                <div class="card-body card-scroll h-350px">
                  <img
                    :src="'http://' + detailImage.url"
                    class="w-500px me-3"
                    alt="image"
                  />
                </div>
              </div>
              <div class="hr-border">
                <hr />
                <span class="hr-title">Susunan Display</span>
              </div>
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr class="fw-bold fs-6 text-gray-800">
                      <th>Display</th>
                      <th>Alamat Display</th>
                      <th>Sub Display</th>
                      <th>Brand</th>
                      <th>SKU</th>
                      <th>URL</th>
                      <th>Denah Display</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="!data.row[0]">
                      <td colspan="6" class="fw-bold text-center">
                        Tidak ada Data
                      </td>
                    </tr>
                    <tr
                      v-for="(r, i) in data.row"
                      :key="i"
                      :style="{
                        backgroundColor:
                          detailImage1.name1 == r.sub_denah_display
                            ? '#fbe1d4'
                            : '',
                      }"
                    >
                      <td>{{ r.display }}</td>
                      <td>{{ r.alamat_display }}</td>
                      <td>{{ r.sub_display }}</td>
                      <td>{{ r.brand }}</td>
                      <td>{{ r.sku }}</td>
                      <td>{{ r.sub_denah_display }}</td>
                      <td>
                        <a
                          @click="displayImage1(r.sub_denah_display)"
                          :style="{
                            backgroundColor:
                              r.sub_denah_display == detailImage1.name1
                                ? '#fbe1d4'
                                : '',
                          }"
                        >
                          <i class="fa fa-eye"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  class="card bg-light shadow-sm"
                  v-if="detailImage1.showImage1"
                >
                  <div class="card-header">
                    <h3 class="card-title">{{ detailImage1.name1 }}</h3>
                  </div>
                  <div class="card-body card-scroll h-350px">
                    <img
                      :src="'http://' + detailImage1.url1"
                      class="w-500px me-3"
                      alt="image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { viewDetail } from "@/stores/displayPercabang";
import Copy from "../../../../helper/coppied";

type Rows = {
  display: string;
  alamat_display: string;
  sub_display: string;
  brand: string;
  sku: string;
  sub_denah_display: string;
};
const defData = {
  bisnis_unit_code: "",
  bisnis_unit: "",
  display_denah: "",
  row: [] as Rows[],
};

export default defineComponent({
  name: "MasterSusunanDisplayPercabangView",
  data() {
    return {
      data: defData,
      detailImage: {
        showImage: false,
        name: "",
        url: "",
      },
      detailImage1: {
        showImage1: false,
        name1: "",
        url1: "",
      },
    };
  },
  methods: {
    displayImage(name) {
      this.detailImage.showImage = true;
      if (name) {
        this.detailImage.name = name;
        this.detailImage.url = name;
      }
    },
    displayImage1(name1) {
      this.detailImage1.showImage1 = true;
      if (name1) {
        this.detailImage1.name1 = name1;
        this.detailImage1.url1 = name1;
      }
    },
  },
  created() {
    watch(
      () => viewDetail.data,
      (data: any) => {
        if (data) {
          this.detailImage.showImage = false;
          this.detailImage1.showImage1 = false;
          this.detailImage1.name1 = "";
          this.detailImage.name = "";
          const { row, record } = data;
          this.data = defData;

          if (record) {
            const { display, display_denah, display_cabang } = record;
            this.data.bisnis_unit_code = display_cabang.bisnis_unit_code;
            this.data.display_denah = display_denah;
            const res: Rows[] = [];

            display?.forEach((element) => {
              element.sub_display.forEach((sub) => {
                const ds: Rows = {
                  display: element.display,
                  alamat_display: element.alamat_display,
                  sub_display: sub.sub_display,
                  brand: sub.brand?.desc_1,
                  sku: sub.sku,
                  sub_denah_display: element.sub_denah_display,
                };
                res.push(ds);
              });
            });
            this.data.row = res;
          } else {
            this.data.row = [];
            this.data.display_denah = "";
          }

          if (row) {
            this.data.bisnis_unit = row.bisnis_unit;
          } else {
            this.data.bisnis_unit = "";
          }
        }
      }
    );
  },
  setup() {
    const modalViewRef = ref<HTMLDivElement | null>(null);
    return {
      modalViewRef,
      Copy,
    };
  },
});
</script>
