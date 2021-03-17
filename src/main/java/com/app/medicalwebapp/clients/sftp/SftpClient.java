package com.app.medicalwebapp.clients.sftp;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpException;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;

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

    public SftpClient() throws JSchException, SftpException {
    }

    public void connect() throws JSchException {
        JSch jsch = new JSch();

         session = jsch.getSession(user, host, port);
         session.setPassword(password);

        session.setConfig("StrictHostKeyChecking", "no");
        session.connect();
    }

    public void saveFile(InputStream fileInputStream, String destination) throws JSchException, SftpException {
        Channel channel = session.openChannel("sftp");
        channel.connect();
        ChannelSftp sftpChannel = (ChannelSftp) channel;
        sftpChannel.put(fileInputStream, destination);
        sftpChannel.exit();
    }

    public InputStream getFile(String source) throws Exception {
        Channel channel = session.openChannel("sftp");
        channel.connect();
        ChannelSftp sftpChannel = (ChannelSftp) channel;
        PipedInputStream pipedInputStream;
        try (PipedOutputStream pipedOutputStream = new PipedOutputStream()) {
            sftpChannel.get(source, pipedOutputStream);
            pipedInputStream = new PipedInputStream(pipedOutputStream);
        }
        sftpChannel.exit();
        return pipedInputStream;
    }

    public void disconnect() {
        if (session != null) {
            session.disconnect();
        }
    }
}
