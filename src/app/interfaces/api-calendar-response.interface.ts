export interface ApiCalendarResponse {
    classroom_work_id: number | null;
    color:             string;
    created_at:        Date;
    deleted_at:        Date;
    description:       string;
    environment_id:    number | null;
    f_ini:             Date;
    f_fin:             Date;
    goals:             string;
    id_activity:       number;
    name_sub:          string;
    nook_id:           number | null;
    status:            number;
    updated_at:        Date;
}
