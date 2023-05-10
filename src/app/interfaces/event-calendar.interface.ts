export interface EventCalendar {
    id_activity:             number;
    nook_id:                 number | null;
    classroom_work_id:       number | null;
    environment_id:          number | null;
    f_ini:                   Date;
    f_fin:                   Date;
    created_at:              Date;
    updated_at:              Date;
    deleted_at:              Date;
    name_sub_nook:           null | string;
    name_sub_environment:    null | string;
    name_sub_classroom_work: null | string;
    color:                   string;
}
