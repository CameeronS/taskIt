package com.cameerons.taskIt;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import com.cameerons.taskIt.controller.WorkSpaceController;
import com.cameerons.taskIt.dto.WorkspaceDto;
import com.cameerons.taskIt.modals.Workspace;
import com.cameerons.taskIt.repository.WorkSpaceRepository;
import com.cameerons.taskIt.service.JwtService;
import com.cameerons.taskIt.service.WorkspaceService;
import java.time.LocalDateTime;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(WorkSpaceController.class)
@AutoConfigureMockMvc
public class WorkSpaceControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private WorkSpaceRepository workSpaceRepository;

    @MockBean
    private WorkspaceService workSpaceService;

    @BeforeEach
    void beforeAll() {
        Workspace workspace = Workspace.builder()
                .name("Test")
                .description("Test")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        workSpaceRepository.save(workspace);
    }


    @WithMockUser
    @Test
     void shouldFindAllWorkspaces () throws Exception {
        mockMvc.perform(get("/api/workspace/getAll"))
                .andExpect(status().isOk());
    }

    @WithMockUser
    @Test
    void shouldFindWorkspaceById () throws Exception {
        mockMvc.perform(get("/api/workspace/get/1"))
                .andExpect(status().isOk());
    }

    @WithMockUser
    @Test
    void shouldCreateNewWorkspace () throws Exception {
        WorkspaceDto workspaceDto = new WorkspaceDto(
                "Test",
                "Test"
        );
        mockMvc.perform(post("/api/workspace/create").contentType("application/json")
                      .content(asJsonString(workspaceDto))              )
                .andExpect(status().isCreated());
    }

    @Test
    void shouldNotFindWorkspaceByIdWhenNotAuthenticated () throws Exception {
        mockMvc.perform(get("/api/workspace/get/1"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void shouldNotFindAllWorkspacesWhenNotAuthenticated () throws Exception {
        mockMvc.perform(get("/api/workspace/getAll"))
                .andExpect(status().isUnauthorized());
    }




    private String asJsonString(Object obj) throws Exception {
        return new ObjectMapper().writeValueAsString(obj);
    }
}
