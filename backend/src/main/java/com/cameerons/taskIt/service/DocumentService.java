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
                              .isArchived(false)
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
                          .isArchived(false)
                          .user(user)
                          .build();

        return documentRepository.save(doc);

    }



    public List<DocumentDto> getAllUserDocuments(String token, Boolean isArchived){
        String jwt = token.substring(7);
        String userEmail = jwtService.extractUsername(jwt);
        // Note change to dto and display all documents on client
        var user = userRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalStateException("User not found"));
        var dbDocuments = documentRepository.findByUserId(user.getId());
        return dbDocuments.stream()
                          .filter(document -> document.getParent() == null && document.getIsArchived() == isArchived)
                          .map(document -> mapToDtoWithChildren(document, isArchived))
                          .collect(Collectors.toList());
    }

    public List <DocumentDto> getAllArchivedDocuments(String token){
        String jwt = token.substring(7);
        String userEmail = jwtService.extractUsername(jwt);
        var user = userRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalStateException("User not found"));
        var dbDocuments = documentRepository.findByUserId(user.getId());
        return dbDocuments.stream()
                          .filter(Document::getIsArchived)
                          .map(this::convertToDto)
                          .collect(Collectors.toList());
    }

    public DocumentDto getDocumentById(Integer documentId, String token){
        String jwt = token.substring(7);
        String userEmail = jwtService.extractUsername(jwt);
        var user = userRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalStateException("User not found"));
        var document = documentRepository.findById(documentId).orElseThrow(() -> new IllegalStateException("Document not found"));
        if(!Objects.equals(document.getUser().getId(), user.getId())){
            throw new IllegalStateException("Document does not belong to user");
        }
        return convertToDto(document);
    }


    public DocumentDto updateDocument(Integer documentId, CreateDocumentDto documentDto, String token){
        String jwt = token.substring(7);
        String userEmail = jwtService.extractUsername(jwt);
        var user = userRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalStateException("User not found"));
        var document = documentRepository.findById(documentId).orElseThrow(() -> new IllegalStateException("Document not found"));
        if(!Objects.equals(document.getUser().getId(), user.getId())){
            throw new IllegalStateException("Document does not belong to user");
        }
        document.setTitle(documentDto.title());
        document.setContent(documentDto.content());
        document.setIcon(documentDto.icon());
        documentRepository.save(document);
        return convertToDto(document);
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
                archiveDocument(child.getId(), token);
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
                restoreDocument(child.getId(), token);
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

        // if the document has children, delete them also

        if(document.getChildren() != null){
            documentRepository.deleteAll(document.getChildren());
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

    private DocumentDto mapToDtoWithChildren(Document document, Boolean isArchived) {
        List<Document> children = document.getChildren();
        List<DocumentDto> childDto = (children != null && !children.isEmpty()) ?
                children.stream()
                        .filter(child -> child.getIsArchived() == isArchived)
                        .map(child -> mapToDtoWithChildren(child, isArchived))
                        .collect(Collectors.toList()):
                List.of();

        return new DocumentDto(
                document.getTitle(),
                document.getContent(),
                document.getIcon(),
                document.getId(),
                document.getParent() != null ? document.getParent().getId() : null,
                document.getUser() != null ? document.getUser().getId() : null,
                document.getIsArchived(),
                childDto

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
