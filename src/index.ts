import {
  CreateParams,
  CreateResult,
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  QueryFunctionContext,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
} from "react-admin";
import _ from "underscore";
// import { SuperClient } from "../../../sandbox/js_ts/erika/erika/eicrud_exports/super_client";

// export const sp = new SuperClient({ url: "http://localhost:3000" });

type SuperClient = any;

export default (sp: SuperClient): DataProvider => ({
  getList: async (
    resource: string,
    params: GetListParams & QueryFunctionContext,
  ): Promise<GetListResult> => {
    const res = await sp[resource as keyof SuperClient].find(
      {
        ...params.filter,
      },
      {
        limit: params.pagination?.perPage,
        offset:
          ((params?.pagination?.page || 0) - 1) *
          (params?.pagination?.perPage || 0),
      },
    );

    return {
      data: res.data as any,
      total: res.total,
    };
  },

  getOne: async (
    resource: string,
    params: GetOneParams & QueryFunctionContext,
  ): Promise<GetOneResult> => {
    const res = await sp[resource as keyof SuperClient].findOne({
      id: params.id,
    });

    return {
      data: res,
    };
  },

  getMany: async (
    resource: string,
    params: GetManyParams & QueryFunctionContext,
  ): Promise<GetManyResult> => {
    const res = await sp[resource as keyof SuperClient].find({
      id: { $in: params.ids },
    });

    return {
      data: res.data,
    };
  },

  getManyReference: async (
    resource: string,
    params: GetManyReferenceParams & QueryFunctionContext,
  ): Promise<GetManyReferenceResult> => {
    const res = await sp[resource as keyof SuperClient].find({
      ...params.filter,
    });

    return {
      data: res.data,
      total: res.total,
    };
  },

  update: async (
    resource: string,
    params: UpdateParams & QueryFunctionContext,
  ): Promise<UpdateResult> => {
    const updatedFileds = _.pick(
      params.data,
      (value, key) => !_.isEqual(value, params.previousData[key]),
    );
    const res = await sp[resource as keyof SuperClient].patch(
      { id: params.id },
      {
        ...updatedFileds,
      },
      {
        returnUpdatedEntities: true,
      },
    );

    return {
      data: res?.updated ? res.updated[0] : {},
    };
  },

  updateMany: async (
    resource: string,
    params: UpdateManyParams & QueryFunctionContext,
  ): Promise<UpdateManyResult> => {
    await sp[resource as keyof SuperClient].patchIn(params.ids, {
      ...params.data,
    });

    return {
      data: params.ids,
    };
  },

  create: async (
    resource: string,
    params: CreateParams & QueryFunctionContext,
  ): Promise<CreateResult> => {
    const res = await sp[resource as keyof SuperClient].create({
      ...params.data,
    });

    return {
      data: res,
    };
  },

  delete: async (
    resource: string,
    params: DeleteParams & QueryFunctionContext,
  ): Promise<DeleteResult> => {
    const res = await sp[resource as keyof SuperClient].deleteOne(
      {
        id: params.id,
      },
      {
        returnUpdatedEntities: true,
      },
    );

    return {
      data: res.deleted ? res.deleted[0] : {},
    };
  },

  deleteMany: async (
    resource: string,
    params: DeleteManyParams & QueryFunctionContext,
  ): Promise<DeleteManyResult> => {
    await sp[resource as keyof SuperClient].deleteIn(params.ids);

    return {
      data: params.ids,
    };
  },
});
