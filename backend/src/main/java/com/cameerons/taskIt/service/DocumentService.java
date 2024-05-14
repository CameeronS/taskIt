package com.cameerons.taskIt.service;
import com.cameerons.taskIt.dto.CreateDocumentDto;
import com.cameerons.taskIt.dto.DocumentDto;
import com.cameerons.taskIt.modals.Document;
import com.cameerons.taskIt.modals.User;
import com.cameerons.taskIt.repository.DocumentRepository;
import com.cameerons.taskIt.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final JwtService jwtService;
    private final UserRepository userRepository;


    public Document createDocument(CreateDocumentDto document , String token){

        String jwt = token.substring(7);
        String userEmail = jwtService.extractUsername(jwt);

        var user = userRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalStateException("User not found"));

        if (document.parentId() == null){
            var doc = Document.builder()
                              .title(document.title())
                              .content(document.content())
                              .icon(document.icon())
                              .user(user)
                              .build();
            return documentRepository.save(doc);
        }

        var parent = documentRepository.findById(document.parentId()).orElseThrow(() -> new IllegalStateException("Parent not found"));

        var doc = Document.builder()
                              .title(document.title())
                              .content(document.content())
                              .icon(document.icon())
                              .parent(parent)
                              .user(user)
                              .build();

            return documentRepository.save(doc);

    }



    public List<DocumentDto> getAllUserDocuments(String token){
        String jwt = token.substring(7);
        String userEmail = jwtService.extractUsername(jwt);
        // Note change to dto and display all documents on client
        var user = userRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalStateException("User not found"));
        var dbDocuments = documentRepository.findByUserId(user.getId());
        return dbDocuments.stream()
                .filter(document -> document.getParent() == null
                        && !document.getIsArchived()
                )

                .map(this::mapToDtoWithChildren)
                .collect(Collectors.toList());


    }

    public String archiveDocument(Integer documentId, String token){
        String jwt = token.substring(7);
        String userEmail = jwtService.extractUsername(jwt);
        var user = userRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalStateException("User not found"));

        var document = documentRepository.findById(documentId).orElseThrow(() -> new IllegalStateException("Document not found"));

        // make sure the document belongs to the user
        if(!Objects.equals(document.getUser()
                                   .getId(), user.getId())){
            throw new IllegalStateException("Document does not belong to user");
        }

        document.setIsArchived(true);

        if(document.getChildren() != null){
            for(Document child : document.getChildren()){
                child.setIsArchived(true);
            }
        }

        documentRepository.save(document);
        return "Document archived successfully";
    }


    public String restoreDocument(Integer documentId, String token){
        String jwt = token.substring(7);
        String userEmail = jwtService.extractUsername(jwt);
        var user = userRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalStateException("User not found"));

        var document = documentRepository.findById(documentId).orElseThrow(() -> new IllegalStateException("Document not found"));

        // make sure the document belongs to the user
        if(!Objects.equals(document.getUser()
                                   .getId(), user.getId())){
            throw new IllegalStateException("Document does not belong to user");
        }

        document.setIsArchived(false);

        if(document.getChildren() != null){
            for(Document child : document.getChildren()){
                child.setIsArchived(false);
            }
        }

        documentRepository.save(document);
        return "Document restored successfully";
    }

    public String permanentDeleteDocument(Integer documentId, String token){
        String jwt = token.substring(7);
        String userEmail = jwtService.extractUsername(jwt);
        var user = userRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalStateException("User not found"));

        var document = documentRepository.findById(documentId).orElseThrow(() -> new IllegalStateException("Document not found"));

        // make sure the document belongs to the user
        if(!Objects.equals(document.getUser()
                                   .getId(), user.getId())){
            throw new IllegalStateException("Document does not belong to user");
        }

        documentRepository.delete(document);
        return "Document deleted successfully";
    }

    private DocumentDto convertToDto(Document document){
        return DocumentDto.builder()
                          .title(document.getTitle())
                          .content(document.getContent())
                          .icon(document.getIcon())
                          .id(document.getId())
                          .parentId(document.getParent() == null ? null : document.getParent().getId())
                          .userId(document.getUser().getId())
                          .isArchived(document.getIsArchived())
                          .build()
                      ;
    }

    private DocumentDto mapToDtoWithChildren(Document document) {
        List<Document> children = document.getChildren();
        List<DocumentDto> childDtos = (children != null && !children.isEmpty()) ?
                children.stream()
                        .map(this::mapToDtoWithChildren) // Recursive call for each child
                        .collect(Collectors.toList()) :
                List.of(); // Empty list if no children

        return new DocumentDto(
                document.getTitle(),
                document.getContent(),
                document.getIcon(),
                document.getId(),
                document.getParent() != null ? document.getParent().getId() : null,
                document.getUser() != null ? document.getUser().getId() : null,
                document.getIsArchived(),
                childDtos

        );
    }

    private Document mapToEntity(DocumentDto documentDTO, User user) {
        Document document = new Document();
        document.setTitle(documentDTO.title());
        document.setContent(documentDTO.content());
        document.setIcon(documentDTO.icon());
        document.setIsArchived(documentDTO.isArchived());
        document.setUser(user);
        return document;
    }

}
