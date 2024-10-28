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
    console.log("getList", { resource, params });

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

    console.log("getOne", { resource, params, res });
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

    console.log("getMany", { resource, params, res });
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

    console.log("getManyReference", { resource, params, res });
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

    console.log("update", { resource, params, res, updatedFileds });

    return {
      data: res?.updated ? res.updated[0] : {},
    };
  },

  updateMany: async (
    resource: string,
    params: UpdateManyParams & QueryFunctionContext,
  ): Promise<UpdateManyResult> => {
    const res = await sp[resource as keyof SuperClient].patch(
      { id: { $in: params.ids } },
      {
        ...params.data,
      },
      {
        returnUpdatedEntities: true,
      },
    );

    console.log("updateMany", { resource, params, res });
    return {
      data: res.updated,
    };
  },

  create: async (
    resource: string,
    params: CreateParams & QueryFunctionContext,
  ): Promise<CreateResult> => {
    const res = await sp[resource as keyof SuperClient].create({
      ...params.data,
    });

    console.log("create", { resource, params, res });
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

    console.log("delete", { resource, params, res });
    return {
      data: res.deleted ? res.deleted[0] : {},
    };
  },

  deleteMany: async (
    resource: string,
    params: DeleteManyParams & QueryFunctionContext,
  ): Promise<DeleteManyResult> => {
    const res = await sp[resource as keyof SuperClient].delete(
      {
        id: { $in: params.ids },
      },
      { returnUpdatedEntities: true },
    );

    console.log("deleteMany", { resource, params, res });
    return {
      data: res.deleted,
    };
  },
});

// getList: <RecordType extends RaRecord = any>(
//   resource: ResourceType,
//   params: GetListParams & QueryFunctionContext
// ) => Promise<GetListResult<RecordType>>;
//
// getOne: <RecordType extends RaRecord = any>(
//   resource: ResourceType,
//   params: GetOneParams<RecordType> & QueryFunctionContext
// ) => Promise<GetOneResult<RecordType>>;
//
// getMany: <RecordType extends RaRecord = any>(
//   resource: ResourceType,
//   params: GetManyParams<RecordType> & QueryFunctionContext
// ) => Promise<GetManyResult<RecordType>>;
//
// getManyReference: <RecordType extends RaRecord = any>(
//   resource: ResourceType,
//   params: GetManyReferenceParams & QueryFunctionContext
// ) => Promise<GetManyReferenceResult<RecordType>>;
//
// update: <RecordType extends RaRecord = any>(
//   resource: ResourceType,
//   params: UpdateParams
// ) => Promise<UpdateResult<RecordType>>;
//
// updateMany: <RecordType extends RaRecord = any>(
//   resource: ResourceType,
//   params: UpdateManyParams
// ) => Promise<UpdateManyResult<RecordType>>;
//
// create: <
//   RecordType extends Omit<RaRecord, 'id'> = any,
//   ResultRecordType extends RaRecord = RecordType & { id: Identifier },
// >(
//   resource: ResourceType,
//   params: CreateParams
// ) => Promise<CreateResult<ResultRecordType>>;
//
// delete: <RecordType extends RaRecord = any>(
//   resource: ResourceType,
//   params: DeleteParams<RecordType>
// ) => Promise<DeleteResult<RecordType>>;
//
// deleteMany: <RecordType extends RaRecord = any>(
//   resource: ResourceType,
//   params: DeleteManyParams<RecordType>
// ) => Promise<DeleteManyResult<RecordType>>;
//
// [key: string]: any;
// supportAbortSignal?: boolean;
//
