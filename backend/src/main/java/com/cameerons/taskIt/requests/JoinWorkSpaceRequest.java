package com.cameerons.taskIt.requests;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class JoinWorkSpaceRequest {

    private Integer workspaceId;
    private Integer userId;

}
