export type Role = "editor"
    | "edit_only"
    | "comment_only"
    | "reader"
    | "none"
    | "edit_content_only"

/**
 * edit_only => user can only edit the content, but cannot
 * share with anyone
 * 
 * comment_only => user can only comment on content, but 
 * cannot edit it
 * 
 * reader => user can only view the content, cannot edit it
 * cannot share it
 * 
 * none => user has no access
 * 
 * edit_content_only => for collection_view_page, user can 
 * only edit content but cannot edit collection_view or
 * restructure
 */