package com.app.medicalwebapp.clients.sftp;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpException;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
@Lazy
public class SftpClient {

    @Value("${sftp.url}")
    private String host;
    @Value("${sftp.port}")
    private int port;
    @Value("${sftp.user}")
    private String user;
    @Value("${sftp.password}")
    private String password;
    private Session session = null;

    public SftpClient() {
    }

    @PostConstruct
    public void connect() throws JSchException {
        JSch jsch = new JSch();

         session = jsch.getSession(user, host, port);
         session.setPassword(password);

        session.setConfig("StrictHostKeyChecking", "no");
        session.connect();
    }

    public void saveFile(byte[] fileInputStream, String destination) throws JSchException, SftpException {
        Channel channel = session.openChannel("sftp");
        channel.connect();
        ChannelSftp sftpChannel = (ChannelSftp) channel;
        InputStream inputStream = new ByteArrayInputStream(fileInputStream);
        sftpChannel.put(inputStream, destination);
        sftpChannel.exit();
    }

    public byte[] getFile(String source) throws Exception {
        Channel channel = session.openChannel("sftp");
        channel.connect();
        ChannelSftp sftpChannel = (ChannelSftp) channel;

        File tempSftpFile = File.createTempFile("sftp-download-temp", "");

        try (OutputStream outputStream = new FileOutputStream(tempSftpFile.getAbsolutePath().toString())) {
            sftpChannel.get(source, outputStream);
        }


        byte[] fileContent = FileUtils.readFileToByteArray(tempSftpFile);
        tempSftpFile.delete();
        sftpChannel.exit();

        return fileContent;
    }

    public void disconnect() {
        if (session != null) {
            session.disconnect();
        }
    }
}
